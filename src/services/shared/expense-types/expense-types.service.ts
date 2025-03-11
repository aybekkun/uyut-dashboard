import { api } from "src/api"
import type { GetParams, ParamId } from "../params.types"
import type { Response, ResponseSingleData } from "../response.types"
import type { ExpenseType } from "./expense-types.types"

class ExpenseTypesService {
	get = async (params: GetParams): Promise<Response<ExpenseType>> => {
		const response = await api.get(`/expense-types`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<ExpenseType>> => {
		const response = await api.get(`/expense-types/${id}`)
		return response.data
	}

	create = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<ExpenseType>> => {
		const response = await api.post(`/expense-types`, form)
		return response.data
	}

	edit = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<ExpenseType>> => {
		const response = await api.put(`/expense-types/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/expense-types/${id}`)
		return response.data
	}
}

export const expenseTypesService = new ExpenseTypesService()
