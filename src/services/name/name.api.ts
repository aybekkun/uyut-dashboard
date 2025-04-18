import { productsNameService } from "./name.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ResponseError } from "src/services/shared"

const useGetProductsNameQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsNameService.get(params),
		queryKey: ["products name", ...Object.values(params)],
		placeholderData: keepPreviousData,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error?.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}

export { useGetProductsNameQuery }
