import { Head, router, useForm, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { Account } from "@/types/Account";
import { useState, useEffect } from "react";
import AccountCard from "@/components/AccountCard";
import AccountModal from "@/components/AccountModal";
import { Button } from "@/components/ui/button";
import {
    PlusIcon
} from "@heroicons/react/24/outline";


interface Props {
    accounts: Account[]
}
export default function Index({ accounts }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const page = usePage();
    const flash = page.props.flash || {};

    useEffect(() => {
        if (flash.success) {
            setSuccessMessage(success);
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.success])

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: "",
        initial_balance: "",
    })

    function openCreate() {
        setEditingAccount(null);
        reset();
        setIsOpen(true);
    }

    function openEdit(account: Account) {
        setEditingAccount(account)
        setData({
            name: account.name,
            initial_balance: "",
        });
        setIsOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault(); 
        if (editingAccount) {
            put(route('accounts.update', editingAccount.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
                preserveScroll: true,
            })
        } else {
            post(route('accounts.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
                preserveScroll: true,
            })
        }
    }

    function handleDelete(account: Account) {
        if (confirm(`Excluir a conta "${account.name}" ?`)) {
            router.delete(route("accounts.destroy", account.id), {
                preserveScroll: true
            });
        }
    }

    return (
        <AppLayout>
            <Head title="Contas" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Contas</h1>
                        <p className="text-sm text-muted-foreground mt-1">Gerencie as suas contas</p>
                    </div>
                    <Button
                        onClick={openCreate}>
                        <PlusIcon h-4 w-4 mr-2 /> Nova conta
                    </Button>
                </div>

                {showSuccess && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                        {successMessage}
                    </div>
                )}

                {accounts.length === 0 ? (
                    <div className="text-center py-16 bg-muted/20 rounded-lg">
                        <p className="text-muted-foreground">Nenhuma conta cadastrada</p>
                        <Button variant="link" onClick={openCreate} className="mt-2">
                            Criar a primeira conta
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accounts.map(account => (
                            <AccountCard
                                key={account.id}
                                account={account}
                                onEdit={openEdit}
                                onDelete={handleDelete} />
                        ))}
                    </div>
                )}



                <AccountModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    submit={submit}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    editingAccount={editingAccount} />

            </div>
        </AppLayout>
    )
}