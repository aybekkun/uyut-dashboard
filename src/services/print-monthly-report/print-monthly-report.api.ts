import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { ResponseError } from "src/services/shared"
import { printMonthlyReportService } from "./print-monthly-report.service"
import { PrintMonthlyReportParams } from "./print-monthly-report.types"

const useGetPrintMonthlyReportQuery = (params: PrintMonthlyReportParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => printMonthlyReportService.get(params),
		queryKey: ["print-monthly-report", ...Object.values(params)],
		placeholderData: keepPreviousData,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}

export { useGetPrintMonthlyReportQuery }
