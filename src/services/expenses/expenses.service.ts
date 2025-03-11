import { api } from "src/api"
import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { Expense } from "./expenses.types"

class ExpensesService {
	get = async (params: GetParams): Promise<Response<Expense>> => {
		const response = await api.get(`/expenses-reports`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Expense>> => {
		const response = await api.get(`/expenses-reports/${id}`)
		return response.data
	}

	create = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<Expense>> => {
		const response = await api.post(`/expenses-reports`, form)
		return response.data
	}

	edit = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<Expense>> => {
		const response = await api.put(`/expenses-reports/${form.id}`, form)
		return response.data
	}

	delete = async (id: unknown): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/expenses-reports/${id}`)
		return response.data
	}
}

export const expensesService = new ExpensesService()
