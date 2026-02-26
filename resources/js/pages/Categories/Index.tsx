import { Category } from "@/types/Category"
import { useEffect, useState } from "react"
import { Head, useForm, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@heroicons/react/24/outline"
import CategoryModal from "@/components/CategoryModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CategoryCard from "@/components/CategoryCard"
import { router } from '@inertiajs/react'

interface Props {
    categories: Category[]
}

export default function Index({ categories }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSucccessMessage] = useState('');

    const page = usePage();
    const flash = page.props.flash || {};

    useEffect(() => {
        if (flash.success) {
            setSucccessMessage(flash.sucess);
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false),
                3000);
            return () => clearTimeout(timer);
        }
    }, [flash])

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
        type: '',
        color: '#3b82f6',
    });

    function openCreate() {
        setEditingCategory(null);
        reset();
        setIsOpen(true);
    }

    function openEdit(category: Category) {
        setEditingCategory(category);
        setData({
            name: category.name,
            type: category.type,
            color: category.color || '#3b82f6',
        })
        setIsOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editingCategory) {
            put(route('categories.update', editingCategory.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
                preserveScroll: true
            })
        } else {
            post(route('categories.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
                preserveScroll: true
            })
        }
    }

    function handleDelete(category: Category) {
        if (confirm(`Excluir categoria "${category.name}"?`)) {
            router.delete(route('categories.destroy', category.id), {
                preserveScroll: true
            });
        }
    }

    const incomeCategories = categories.filter(c => c.type === 'income');
    const expenseCategories = categories.filter(c => c.type === 'expense');

    return (
        <AppLayout>
            <Head title="Categorias" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Categorias</h1>
                        <p className="text-gray-600 text-sm">Organizes suas receitas e despesas por categorias</p>
                    </div>

                    <Button onClick={openCreate}>
                        <PlusIcon />
                        Nova Categoria
                    </Button>
                </div>

                {showSuccess && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                        {successMessage}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-green-600">Receitas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {incomeCategories.length === 0 ? (
                                <p className="text-gray-500 text-sm">Nenhuma categoria de receita</p>
                            )
                                : (
                                    incomeCategories.map(cat => (
                                        <CategoryCard
                                        key={cat.id}
                                        category={cat}
                                        onEdit={openEdit}
                                        onDelete={handleDelete}/>
                                    ))
                                )}

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-600">Despesas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {expenseCategories.length === 0 ? (
                                <p className="text-gray-500 text-sm">Nenhuma categoria de despesa</p>
                            )
                                : (
                                    expenseCategories.map(cat => (
                                        <CategoryCard
                                        key={cat.id}
                                        category={cat}
                                        onEdit={openEdit}
                                        onDelete={handleDelete}/>
                                    ))
                                )}

                        </CardContent>
                    </Card>
                </div>

                <CategoryModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    submit={submit}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    editingCategory={editingCategory}
                />

            </div>

        </AppLayout>
    )
}