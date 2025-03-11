import { api } from "src/api"
import {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { Supplier, SupplierForm } from "./suppliers.types"

class SuppliersService {
	get = async (params: GetParams): Promise<Response<Supplier>> => {
		const response = await api.get(`/suppliers`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Supplier>> => {
		const response = await api.get(`/suppliers/${id}`)
		return response.data
	}

	create = async (
		form: SupplierForm
	): Promise<ResponseSingleData<Supplier>> => {
		const response = await api.post(`/suppliers`, form)
		return response.data
	}

	edit = async (form: SupplierForm): Promise<ResponseSingleData<Supplier>> => {
		const response = await api.put(`/suppliers/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/suppliers/${id}`)
		return response.data
	}
}

export const suppliersService = new SuppliersService()
