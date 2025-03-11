import { api } from "src/api"
import { GetParams } from "../params.types"
import { Response } from "../response.types"
import { Client } from "./clients.types"

class ClientsService {
	get = async (params: GetParams): Promise<Response<Client>> => {
		const response = await api.get(`/clients`, { params })
		return response.data
	}
}

export const clientsService = new ClientsService()
