import { api } from "src/api"
import {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { Color, ColorForm } from "./colors.types"

class ColorsService {
	get = async (params: GetParams): Promise<Response<Color>> => {
		const response = await api.get(`/products/collar`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Color>> => {
		const response = await api.get(`/products/collar/${id}`)
		return response.data
	}

	create = async (form: ColorForm): Promise<ResponseSingleData<Color>> => {
		const response = await api.post(`/products/collar`, form)
		return response.data
	}

	edit = async (form: ColorForm): Promise<ResponseSingleData<Color>> => {
		const response = await api.put(`/products/collar/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/products/collar/${id}`)
		return response.data
	}
}

export const colorsService = new ColorsService()
