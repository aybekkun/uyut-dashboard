import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { ResponseError } from "src/services/shared"
import { soldProductStatService } from "./sold-product-stat.service"
import { SoldProductStatParams } from "./sold-product-stat.types"

const useGetSoldProductStatQuery = (params: SoldProductStatParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => soldProductStatService.get(params),
		queryKey: ["sold-product-stat", ...Object.values(params)],
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

export { useGetSoldProductStatQuery }
