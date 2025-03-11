import { api } from "src/api"
import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import type {
	WriteOffProduct,
	WriteOffProductForm
} from "./write-off-products.types"

class WriteOffProductsService {
	get = async (params: GetParams): Promise<Response<WriteOffProduct>> => {
		const response = await api.get(`/write-off-reports`, { params })
		return response.data
	}

	getById = async (
		id: ParamId
	): Promise<ResponseSingleData<WriteOffProduct>> => {
		const response = await api.get(`/write-off-reports/${id}`)
		return response.data
	}

	create = async (
		form: WriteOffProductForm
	): Promise<ResponseSingleData<WriteOffProduct>> => {
		const response = await api.post(`/write-off-reports`, form)
		return response.data
	}

	edit = async (
		form: WriteOffProductForm
	): Promise<ResponseSingleData<WriteOffProduct>> => {
		const response = await api.put(`/write-off-reports/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/write-off-reports/${id}`)
		return response.data
	}
}

export const writeOffProductsService = new WriteOffProductsService()
