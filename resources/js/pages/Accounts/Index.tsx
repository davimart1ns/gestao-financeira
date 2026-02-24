import { Head, router, useForm, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { Account } from "@/types/Account";
import { useState, useEffect } from "react";
import AccountCard from "@/components/AccountCard";
import AccountModal from "@/components/AccountModal";

interface Props {
    accounts: Account[]
}
export default function Index({ accounts }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null)

    const page = usePage();
    const flash = page.props.flash || {};

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
        e.preventDefault()
        if (editingAccount) {
            put(route('accounts.update', editingAccount.id), {
                onSuccess: () => setIsOpen(false),
            })
        } else {
            post(route('accounts.store'), {
                onSuccess: () => setIsOpen(false),
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
            <Head tittle="Contas" />

            <div className="max-w-5xl mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Minhas contas</h1>
                    <button
                        onClick={openCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Nova conta
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-2">
                    {accounts.map(account => (
                        <AccountCard
                            key={account.id}
                            account={account}
                            onEdit={openEdit}
                            onDelete={handleDelete} />
                    ))}
                </div>

                    <AccountModal 
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    submit={submit}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    editingAccount = {editingAccount}/>

            </div>
        </AppLayout>
    )
}