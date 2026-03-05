// resources/js/pages/Transactions/Index.tsx
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Account } from '@/types/Account';
import { Category } from '@/types/Category';
import { Transaction } from '@/types/Transaction';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { PencilIcon, TrashIcon, PlusIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import TransactionModal from '@/components/TransactionModal';
import TransactionCard from '@/components/TransactionCard';

interface Props {
    account: Account;
    transactions: {
        data: Transaction[];
    };
    categories: Category[];
}

export default function Index({ account, transactions, categories }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        category_id: '',
        amount: '',
        description: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
    });

    function openCreate() {
        setEditingTransaction(null);
        reset();
        setShowForm(true);
    }

    function openEdit(transaction: Transaction) {
        setEditingTransaction(transaction);
        setData({
            category_id: transaction.category_id.toString(),
            amount: transaction.amount.toString(),
            description: transaction.description,
            type: transaction.type,
            date: transaction.date,
        });
        setShowForm(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        const submitData = {
            ...data,
            amount: parseFloat(data.amount),
            category_id: parseInt(data.category_id),
        };

        if (editingTransaction) {
            put(route('accounts.transactions.update', [account.id, editingTransaction.id]), {
                data: submitData,
                onSuccess: () => {
                    setShowForm(false);
                    reset();
                },
            });
        } else {
            post(route('accounts.transactions.store', account.id), {
                data: submitData,
                onSuccess: () => {
                    setShowForm(false);
                    reset();
                },
            });
        }
    }

    function handleDelete(transaction: Transaction) {
        if (confirm(`Excluir "${transaction.description}"?`)) {
            router.delete(route('accounts.transactions.destroy', [account.id, transaction.id]));
        }
    }


    return (
        <AppLayout>
            <Head title={`${account.name} - Transações`} />

            <div className="p-6">
                {/* Header simples */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('accounts.index')}
                            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                            Voltar 
                        </Link>
                        <h1 className="text-2xl font-bold">{account.name}</h1>
                    </div>
                    <Button onClick={openCreate} size="sm">
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Nova 
                    </Button>
                </div>

                {/* Saldo atual simples */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Saldo atual</p>
                        <p className="text-2xl font-bold">
                            R$ {account.initial_balance.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>

                {/* Lista de transações */}
                <div className="space-y-2">
                    {transactions.data.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Nenhuma transação</p>
                    ) : (
                        transactions.data.map(t => (
                            <TransactionCard
                                key={t.id}
                                t={t}
                                categories={categories}
                                handleDelete={handleDelete}
                                openEdit={openEdit} />

                        ))
                    )}
                </div>

                <TransactionModal
                    isOpen={showForm}
                    onClose={() => setShowForm(false)}
                    categories={categories}
                    submit={submit}
                    data={data}
                    setData={setData}
                    reset={reset}
                    processing={processing}
                    errors={errors}
                    editingTransaction={editingTransaction}
                />
            </div>
        </AppLayout>
    );
}