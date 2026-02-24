import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"


export default function AccountModal({
    isOpen,
    onClose,
    submit,
    data,
    setData,
    errors,
    processing,
    editingAccount,
}: any) {
    if (!isOpen) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {editingAccount ? "Editar conta " : "Nova conta"}
                    </DialogTitle>
                    <DialogDescription>
                        {editingAccount ? "Altere os seus dados" : "Adicione uma nova conta para controlar suas finanças"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da conta *</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ex: Nubank, Itaú, Carteira"
                            disabled={processing} />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="balance">Saldo inicial</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1.25 text-gray-500">R$</span>
                            <Input
                                id="balance"
                                type="number"
                                step={0.01}
                                value={data.initial_balance}
                                onChange={(e) => setData('initial_balance', e.target.value)}
                                className="pl-10"
                                placeholder="0,00"
                                disabled={processing} />
                        </div>
                        {errors.initial_balance && (
                            <p className="text-sm text-red-500">{errors.initial_balance}</p>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex-1">
                            {processing ? "Salvando..." : (editingAccount ? "Salvar" : "Criar")}
                        </Button>
                        <Button
                            type="button"
                            variant={"outline"}
                            onClick={onClose}
                            disabled={processing}
                            className="flex-1">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}