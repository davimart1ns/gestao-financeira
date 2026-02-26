export interface Category{
    id: number
    name: string
    color: string
    type: 'income' | 'expense'
    transactions_count?: number
    created_at: string
    updated_at: string
}