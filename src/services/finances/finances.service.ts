import { api } from "src/api"
import type {
	GetParams,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import type {
	FinanceByDate,
	FinanceByToday,
	FinanceDate,
	FinanceUrl
} from "./finances.types"

class FinancesService {
	getByDate = async (
		url: FinanceUrl,
		type: FinanceDate,
		params: GetParams
	): Promise<ResponseData<FinanceByDate>> => {
		const response = await api.get(`/${url}-by-${type}`, { params })
		return response.data
	}

	getByToday = async (
		url: FinanceUrl,
		params: GetParams
	): Promise<ResponseSingleData<FinanceByToday>> => {
		const response = await api.get(`/${url}-by-today`, { params })
		return response.data
	}
}

export const financesService = new FinancesService()
