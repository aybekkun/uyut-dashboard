import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { ResponseError } from "src/services/shared"
import { productMonthlyReportService } from "./product-monthly-report.service"
import { ProductMonthlyReportParams } from "./product-monthly-report.types"

const useGetProductMonthlyReportQuery = (params: ProductMonthlyReportParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productMonthlyReportService.get(params),
		queryKey: ["product-monthly-report", ...Object.values(params)],
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

export { useGetProductMonthlyReportQuery }
