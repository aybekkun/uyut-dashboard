import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ResponseError } from "src/services/shared"
import { debtorsService } from "./debtors.service"

const useGetDebtorsQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => debtorsService.get(params),
		queryKey: ["debtors", ...Object.values(params)],
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

export { useGetDebtorsQuery }
