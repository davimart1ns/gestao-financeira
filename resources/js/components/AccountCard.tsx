import { Account } from "@/types/Account";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function AccountCard({
    account,
    onEdit,
    onDelete,
}: {
    account: Account
    onEdit: (account: Account) => void
    onDelete: (account: Account) => void
}) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <Link href={route('accounts.transactions.index', account.id)}>
                        <h3 className="font-semibold text-lg hover:text-blue-600">{account.name}</h3>
                        </Link>
                        <p className="text-2xl font-bold text-green-600 mt-2">R$ {account.initial_balance?.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(account)}
                            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                            <PencilIcon className="w-4 h-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(account)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}