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
        <div className="fixed inset-0  flex items-center justify-center">
            <div className=" p-6 rounded w-full max-w-md border-">
                <h2 className="text-xl font-bold mb-4">
                    {editingAccount ? "Editar conta" : "Nova conta"}
                </h2>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nome da conta"
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                    </div>

                    {!editingAccount && (
                        <div>
                            <input
                                type="number"
                                placeholder="Saldo inicial"
                                value={data.initial_balance}
                                onChange={e => setData("initial_balance", e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.initial_balance && (
                                <p className="text-red-500 text-sm">
                                    {errors.initial_balance}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>

                        <button
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}