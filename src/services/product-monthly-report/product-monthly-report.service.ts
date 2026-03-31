import { api } from "src/api"
import { Response } from "src/services/shared"
import {
	ProductMonthlyReportData,
	ProductMonthlyReportParams
} from "./product-monthly-report.types"

class ProductMonthlyReportService {
	get = async (
		params: ProductMonthlyReportParams
	): Promise<Response<ProductMonthlyReportData>> => {
		const response = await api.get(`/product-monthly-report`, { params })
		return response.data
	}
}

export const productMonthlyReportService = new ProductMonthlyReportService()
