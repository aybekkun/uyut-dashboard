import { api } from "src/api"
import type { GetParams, ParamId } from "../params.types"
import type { Response, ResponseSingleData } from "../response.types"
import type { PrintType, PrintTypeForm } from "./print-types.types"

class PrintTypesService {
	get = async (params: GetParams): Promise<Response<PrintType>> => {
		const response = await api.get(`/print-types`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<PrintType>> => {
		const response = await api.get(`/print-types/${id}`)
		return response.data
	}

	create = async (
		form: PrintTypeForm
	): Promise<ResponseSingleData<PrintType>> => {
		const response = await api.post(`/print-types`, form)
		return response.data
	}

	edit = async (
		form: PrintTypeForm
	): Promise<ResponseSingleData<PrintType>> => {
		const response = await api.put(`/print-types/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<PrintType>> => {
		const response = await api.delete(`/print-types/${id}`)
		return response.data
	}
}

export const printTypesService = new PrintTypesService()
