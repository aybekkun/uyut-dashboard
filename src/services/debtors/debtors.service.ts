import { api } from "src/api"
import type { GetParams, Response } from "src/services/shared"
import { Debtor } from "./debtors.types"

class DebtorsService {
	get = async (params: GetParams): Promise<Response<Debtor>> => {
		const response = await api.get(`/debtors`, { params })
		return response.data
	}
}

export const debtorsService = new DebtorsService()
