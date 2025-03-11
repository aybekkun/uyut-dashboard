import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { ResponseError } from "../response.types"
import { rolesService } from "./roles.service"

const useGetRolesQuery = () => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => rolesService.get(),
		queryKey: ["roles"],
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

export { useGetRolesQuery }
