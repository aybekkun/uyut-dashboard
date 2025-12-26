import { api } from "src/api"
import type { GetParams, Response } from "src/services/shared"
import { Debtor, DebtorForm } from "./debtors.types"

class DebtorsService {
	get = async (params: GetParams): Promise<Response<Debtor>> => {
		const response = await api.get(`/debtors`, { params })
		return response.data
	}

	create = async (data: DebtorForm): Promise<Debtor> => {
		const response = await api.post(`/debtors`, data)
		return response.data
	}

	patchDueDate = async (id: number, due_date: string | null): Promise<Debtor> => {
		const response = await api.patch(`/debtors/${id}`, { due_date })
		return response.data
	}
}

export const debtorsService = new DebtorsService()
