import { api } from "src/api"
import type { ParamId, ResponseSingleData } from "src/services/shared"
import type { PrintDetail, PrintDetailForm } from "./print-details.types"

class PrintDetailsService {
	getById = async (id: ParamId): Promise<ResponseSingleData<PrintDetail>> => {
		const response = await api.get(`/print-details/${id}`)
		return response.data
	}

	edit = async (
		form: PrintDetailForm
	): Promise<ResponseSingleData<PrintDetail>> => {
		const response = await api.put(`/print-details/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/print-details/${id}`)
		return response.data
	}
}

export const printDetailsService = new PrintDetailsService()
