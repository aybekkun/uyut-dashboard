import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ResponseError } from "src/services/shared"
import { financesService } from "./finances.service"
import { FinanceDate, FinanceUrl } from "./finances.types"

const useGetFinancesByDateQuery = (
	url: FinanceUrl,
	type: FinanceDate,
	params: GetParams
) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => financesService.getByDate(url, type, params),
		queryKey: [url, `by-${type}`, ...Object.values(params)],
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

const useGetFinancesByTodayQuery = (url: FinanceUrl, params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => financesService.getByToday(url, params),
		queryKey: [url, "by-today", ...Object.values(params)],
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

export { useGetFinancesByDateQuery, useGetFinancesByTodayQuery }
