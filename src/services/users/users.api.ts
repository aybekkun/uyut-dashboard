import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { GetParams, ParamId, ResponseError } from "src/services/shared"
import { usersService } from "./users.service"

const useGetUsersQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => usersService.get(params),
		queryKey: ["users", ...Object.values(params)],
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

const useGetUsersByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => usersService.getById(id),
		queryKey: ["users", id],
		placeholderData: keepPreviousData,
		enabled: !!id,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}

const useCreateUsersMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: usersService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["users"]
			})
			message.success({
				message: "Success",
				description: "User created successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
		}
	})
}

const useEditUsersMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: usersService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["users"]
			})
			message.success({
				message: "Success",
				description: "User updated successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
		}
	})
}

const useDeleteUsersMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: usersService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["users"]
			})
			message.success({
				message: "Success",
				description: "User deleted successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error.message,
				description: error?.response?.data?.message
			})
		}
	})
}

export {
	useGetUsersQuery,
	useGetUsersByIdQuery,
	useCreateUsersMutation,
	useEditUsersMutation,
	useDeleteUsersMutation
}
