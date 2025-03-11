import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { GetParams } from "../params.types"
import { ResponseError } from "../response.types"
import { clientsService } from "./clients.service"

const useGetClientsQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => clientsService.get(params),
		queryKey: ["clients", ...Object.values(params)],
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

export { useGetClientsQuery }
