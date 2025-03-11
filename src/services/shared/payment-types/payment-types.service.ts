import { api } from "src/api"
import { GetParams, ParamId } from "../params.types"
import { Response, ResponseSingleData } from "../response.types"
import { PaymentType, PaymentTypeForm } from "./payment-types.types"

class PaymentTypesService {
	get = async (params: GetParams): Promise<Response<PaymentType>> => {
		const response = await api.get(`/payment-types`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<PaymentType>> => {
		const response = await api.get(`/payment-types/${id}`)
		return response.data
	}

	create = async (
		form: PaymentTypeForm
	): Promise<ResponseSingleData<PaymentType>> => {
		const response = await api.post(`/payment-types`, form)
		return response.data
	}

	edit = async (
		form: PaymentTypeForm
	): Promise<ResponseSingleData<PaymentType>> => {
		const response = await api.put(`/payment-types/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/payment-types/${id}`)
		return response.data
	}
}

export const paymentTypesService = new PaymentTypesService()
