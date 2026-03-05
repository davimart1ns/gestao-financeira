import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function TransactionModal({
    isOpen,
    categories = [],
    onClose,
    submit,
    data,
    setData,
    processing, 
    errors,
    editingTransaction,
}: any) {
    const filteredCategories = categories.filter(c => c.type === data.type);
    
    if (!isOpen) return null
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {editingTransaction ? "Editar categoria" : "Nova Categoria"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    {/* Tipo */}
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            onClick={() => setData('type', 'expense')}
                            className={`flex-1 py-2 px-3 rounded border ${data.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-100'
                                }`}
                        >
                            Despesa
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setData('type', 'income')}
                            className={`flex-1 py-2 px-3 rounded border ${data.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-100'
                                }`}
                        >
                            Receita
                        </Button>
                    </div>

                    {/* Categoria */}
                    <Select
                        value={data.category_id}
                        onValueChange={v => setData('category_id', v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredCategories.map(cat => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}

                    {/* Valor */}
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="Valor"
                        value={data.amount}
                        onChange={e => setData('amount', e.target.value)}
                    />
                    {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}

                    {/* Descrição */}
                    <Input
                        placeholder="Descrição"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}

                    {/* Data */}
                    <Input
                        type="date"
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
                    />
                    {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}

                    {/* Botões */}
                    <div className="flex gap-2 pt-2">
                        <Button type="submit" disabled={processing} className="flex-1">
                            {processing ? 'Salvando...' : (editingTransaction ? 'Salvar' : 'Criar')}
                        </Button>
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}