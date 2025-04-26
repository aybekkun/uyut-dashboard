
import { api } from "src/api"
import { Expense } from "../expenses"
import { Response } from "../shared"

export type CashFlow = {
	month: number
	start_remainder_amount: string
	sell_amount: string
	end_remainder_amount: string
	expenses: Expense[]
}

export type ProfitLose = {
	month: number
	sell_amount: string
	expenses: Expense[]
	profit: string
}

class CashFlowService {
	get = async (): Promise<Response<CashFlow>> => {
		const response = await api.get(`/cash-flow`)
		return response.data
	}
	getProfitLose = async (): Promise<Response<ProfitLose>> => {
		const response = await api.get(`/profit-and-lose`)
		return response.data
	}
}

export const cashFlowService = new CashFlowService()
