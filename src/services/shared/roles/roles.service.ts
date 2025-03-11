import { api } from "src/api"
import type { Response } from "../response.types"
import type { Role } from "./roles.types"

class RolesService {
	get = async (): Promise<Response<Role>> => {
		const response = await api.get(`/roles`)
		return response.data
	}
}

export const rolesService = new RolesService()
