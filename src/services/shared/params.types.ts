import type { FinancePriceType, FinanceType } from "src/services/finances"

type GetParams = {
	page?: number
	limit?: number
	search?: string
	year?: string
	month?: string | number
	type?: FinanceType
	price_type?: FinancePriceType
	redirect?: string
}

type ParamId = number | string | undefined

export type { GetParams, ParamId }
