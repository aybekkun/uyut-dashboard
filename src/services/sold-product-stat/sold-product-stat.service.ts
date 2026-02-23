import { api } from "src/api"
import { Response } from "src/services/shared"
import {
	SoldProductStat,
	SoldProductStatParams
} from "./sold-product-stat.types"

class SoldProductStatService {
	get = async (
		params: SoldProductStatParams
	): Promise<Response<SoldProductStat>> => {
		const response = await api.get(`/sold-product-stat`, { params })
		return response.data
	}
}

export const soldProductStatService = new SoldProductStatService()
