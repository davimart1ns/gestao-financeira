import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function TransactionCard({
    t,
    categories = [],
    handleDelete,
    openEdit
}) {
    const category = categories.find(c => c.id === t.category_id);
    return (
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50
        ">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{t.description}</span>
                    {category && (
                        <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full">
                            {category.name}
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500">
                    {new Date(t.date).toLocaleDateString('pt-BR')}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <span className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                </span>

                <div className="flex gap-1">
                    <button onClick={() => openEdit(t)} className="p-1 text-gray-500 hover:text-yellow-600">
                        <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(t)} className="p-1 text-gray-500 hover:text-red-600">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}