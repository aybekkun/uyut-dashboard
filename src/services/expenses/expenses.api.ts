import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ParamId, ResponseError } from "src/services/shared"
import { expensesService } from "./expenses.service"

const useGetExpensesQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => expensesService.get(params),
		queryKey: ["expenses", ...Object.values(params)],
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

const useGetExpensesByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => expensesService.getById(id),
		queryKey: ["expenses", id],
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

const useCreateExpensesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: expensesService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["expenses"]
			})
			message.success({
				message: "Success",
				description: "Expense created successfully"
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

const useEditExpensesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: expensesService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["expenses"]
			})
			message.success({
				message: "Success",
				description: "Expense updated successfully"
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

const useDeleteExpensesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: expensesService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["expenses"]
			})
			message.success({
				message: "Success",
				description: "Expense deleted successfully"
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
	useGetExpensesQuery,
	useGetExpensesByIdQuery,
	useCreateExpensesMutation,
	useEditExpensesMutation,
	useDeleteExpensesMutation
}
