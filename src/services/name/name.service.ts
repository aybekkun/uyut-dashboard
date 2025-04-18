import { api } from "src/api"
import {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { ProductsName, ProductsNameForm } from "./name.types"

class ProductsNameService {
	get = async (params: GetParams): Promise<Response<ProductsName>> => {
		const response = await api.get(`/products/name`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<ProductsName>> => {
		const response = await api.get(`/products/name/${id}`)
		return response.data
	}

	create = async (form: ProductsNameForm): Promise<ResponseSingleData<ProductsName>> => {
		const response = await api.post(`/products/name`, form)
		return response.data
	}

	edit = async (form: ProductsNameForm): Promise<ResponseSingleData<ProductsName>> => {
		const response = await api.put(`/products/name/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/products/name/${id}`)
		return response.data
	}
}

export const productsNameService = new ProductsNameService()
