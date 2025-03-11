import { api } from "src/api"
import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { SalesProduct, SalesProductForm } from "./sales-products.types"

class SalesProductsService {
	get = async (params: GetParams): Promise<Response<SalesProduct>> => {
		const response = await api.get(`/sales-products`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<SalesProduct>> => {
		const response = await api.get(`/sales-products/${id}`)
		return response.data
	}

	create = async (
		form: SalesProductForm | FormData
	): Promise<ResponseSingleData<SalesProduct>> => {
		const response = await api.post(`/sales-products`, form)
		return response.data
	}

	edit = async (
		form: SalesProductForm
	): Promise<ResponseSingleData<SalesProduct>> => {
		const response = await api.put(
			`/sales-products/${form.id}`,
			form?.formData || form,
			{
				headers: {
					"Content-Type": form?.formData
						? "multipart/form-data"
						: "application/json"
				}
			}
		)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/sales-products/${id}`)
		return response.data
	}
}

export const salesProductsService = new SalesProductsService()
