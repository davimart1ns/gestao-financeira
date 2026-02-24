import { Account } from "@/types/Account";

export default function AccountCard({
    account,
    onEdit,
    onDelete,
}: {
    account: Account
    onEdit: (account: Account) => void
    onDelete: (account: Account) => void
}) 
{
    return (
        <div className="p-4 border rounded shadow-sm flex justify-between items center ">
            <div>
                <h2 className="font font-semibold">{account.name}</h2>
                <p className="text-gray-500">{account.total_balance ?? 0}</p>:
            </div>

            <div className="flex gap-2">
                <button onClick={() => onEdit(account)}
                    className="text-blue-600"> 
                    Editar
                </button>
                <button onClick={() => onDelete(account)}
                    className="text-red-600">
                    Excluir
                </button>
            </div>
        </div>
    )
}