import { SalesProduct } from "src/services/sales-products"
import { Client } from "../shared/clients"

type Transaction = {
    paid_amount: string
    created_at: string
}

type Debtor = {
    id: number
    sell: SalesProduct
    client: Client
    total_amount: string
    total_paid_amount: string
    owed_amount: string
    is_finished: boolean
    is_debtor: boolean
    created_at: string
    due_date: string | null
    transaction: Transaction[]
}

type DebtorForm = {
    sell_id: string
    paid_amount: string
    client_id: string
}

export type { Debtor, DebtorForm }
