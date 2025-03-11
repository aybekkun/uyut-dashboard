import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { GetParams, ParamId } from "../params.types"
import { ResponseError } from "../response.types"
import { expenseTypesService } from "./expense-types.service"

const useGetExpenseTypesQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => expenseTypesService.get(params),
		queryKey: ["expense-types", ...Object.values(params)],
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

const useGetExpenseTypesByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => expenseTypesService.getById(id),
		queryKey: ["expense-types", id],
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

const useCreateExpenseTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: expenseTypesService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["expense-types"]
			})
			message.success({
				message: "Success",
				description: "Expense type created successfully"
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

const useEditExpenseTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: expenseTypesService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["expense-types"]
			})
			message.success({
				message: "Success",
				description: "Expense type updated successfully"
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

const useDeleteExpenseTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: expenseTypesService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["expense-types"]
			})
			message.success({
				message: "Success",
				description: "Expense type deleted successfully"
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
	useGetExpenseTypesQuery,
	useGetExpenseTypesByIdQuery,
	useCreateExpenseTypesMutation,
	useEditExpenseTypesMutation,
	useDeleteExpenseTypesMutation
}
