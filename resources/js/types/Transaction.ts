import { Account } from "./Account"
import { Category } from "./Category"

export interface Transaction {
    id: number
    description: string
    amount: number
    type: 'income' | 'expense'
    date: string
    account_id: number
    category_id: number
    account?: Account
    category?: Category
    created_at: string
    updated_at: string
}