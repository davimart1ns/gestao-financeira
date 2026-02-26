import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"


export default function CategoryModal({
    isOpen,
    onClose,
    submit,
    data,
    setData,
    processing,
    errors,
    editingCategory,
}: any) {
    if (!isOpen) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {editingCategory ? "Editar categoria" : "Nova Categoria"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label className="text-sm font-medium">Nome</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => { setData('name', e.target.value) }}
                            placeholder="Ex: Salário, Alimentação, Transporte" />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <Label className="text-sm font-medium">Tipo</Label>
                        <Select
                            value={data.type}
                            onValueChange={v => setData('type', v as 'income' | 'expense')}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="income">Receita</SelectItem>
                                <SelectItem value="expense">Despesa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="text-sm font-medium">Cor</Label>
                        <Input
                            type="color"
                            value={data.color}
                            onChange={(e) => { setData('color', e.target.value) }}
                            className="h-10" />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex-1">
                            {processing ? "Salvando..." : (editingCategory ? "Salvar" : "Criar")}
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