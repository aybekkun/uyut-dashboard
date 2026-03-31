import { api } from "src/api"
import {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { ProductsCollar, ProductsCollarForm } from "./collar.types"

class ProductsCollarService {
	get = async (params: GetParams): Promise<Response<ProductsCollar>> => {
		const response = await api.get(`/products/collar`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<ProductsCollar>> => {
		const response = await api.get(`/products/collar/${id}`)
		return response.data
	}

	create = async (form: ProductsCollarForm): Promise<ResponseSingleData<ProductsCollar>> => {
		const response = await api.post(`/products/collar`, form)
		return response.data
	}

	edit = async (form: ProductsCollarForm): Promise<ResponseSingleData<ProductsCollar>> => {
		const response = await api.put(`/products/collar/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/products/collar/${id}`)
		return response.data
	}
}

export const productsCollarService = new ProductsCollarService()
