import { api } from "src/api"
import { Response } from "src/services/shared"
import {
	PrintMonthlyReportData,
	PrintMonthlyReportParams
} from "./print-monthly-report.types"

class PrintMonthlyReportService {
	get = async (
		params: PrintMonthlyReportParams
	): Promise<Response<PrintMonthlyReportData>> => {
		const response = await api.get(`/print-monthly-report`, { params })
		return response.data
	}
}

export const printMonthlyReportService = new PrintMonthlyReportService()
