import { api } from "src/api"
import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import type { User, UserForm } from "./users.types"

class UsersService {
	get = async (params: GetParams): Promise<Response<User>> => {
		const response = await api.get(`/admins`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<User>> => {
		const response = await api.get(`/admins/${id}`)
		return response.data
	}

	create = async (form: UserForm): Promise<ResponseSingleData<User>> => {
		const response = await api.post(`/admins`, form)
		return response.data
	}

	edit = async (form: UserForm): Promise<ResponseSingleData<User>> => {
		const response = await api.put(`/admins/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/admins/${id}`)
		return response.data
	}
}

export const usersService = new UsersService()
