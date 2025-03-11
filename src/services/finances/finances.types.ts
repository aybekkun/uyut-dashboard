type FinanceByDate = {
	date: string
	total: number | string
}

type FinanceByToday = {
	date: string
	total_amount: number | string
	total_count: number
}

type FinanceUrl = "products" | "sales-products" | "expenses" | "write-off-reports"
type FinanceDate = "year" | "month" | "days"

type FinanceType = "amount" | "count"

type FinancePriceType = "uzs" | "usd"

export type {
	FinanceByDate,
	FinanceByToday,
	FinanceUrl,
	FinanceDate,
	FinanceType,
	FinancePriceType
}
