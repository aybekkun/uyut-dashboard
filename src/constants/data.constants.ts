import type { FinancePriceType, FinanceType } from "src/services/finances"

type FinanceTypesData = {
	label: string
	value: FinanceType
}

type FinancePriceTypesData = {
	label: string
	value: FinancePriceType
}

const financeTypesData: FinanceTypesData[] = [
	{
		label: "Общая сумма",
		value: "amount"
	},
	{
		label: "Общее количество",
		value: "count"
	}
]

const financePriceTypesData: FinancePriceTypesData[] = [
	{
		label: "UZS",
		value: "uzs"
	},
	{
		label: "USD",
		value: "usd"
	}
]

export {
	financeTypesData,
	financePriceTypesData,
	type FinancePriceTypesData,
	type FinanceTypesData
}
