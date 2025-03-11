import type { ExpenseType } from "src/services/shared/expense-types"
import type { User } from "src/services/users"

type Expense = {
	id: number
	expense_type: ExpenseType
	name: string
	amount: number | string
	cashier: User
	created_at: string
}

type ExpenseForm = {
	id?: number
	expense_id: number
	name: string
	amount: number | string
}

export type { Expense, ExpenseForm }
