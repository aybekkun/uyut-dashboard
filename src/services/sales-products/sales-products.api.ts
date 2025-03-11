import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { GetParams, ParamId, ResponseError } from "src/services/shared"
import { salesProductsService } from "./sales-products.service"

const useGetSalesProductsQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => salesProductsService.get(params),
		queryKey: ["sales-products", ...Object.values(params)],
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

const useGetSalesProductsByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => salesProductsService.getById(id),
		queryKey: ["sales-products", id],
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

const useCreateSalesProductsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: salesProductsService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["sales-products"]
			})
			message.success({
				message: "Success",
				description: "Product created successfully"
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

const useEditSalesProductsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: salesProductsService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["sales-products"]
			})
			message.success({
				message: "Success",
				description: "Product edited successfully"
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

const useDeleteSalesProductsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: salesProductsService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["sales-products"]
			})
			message.success({
				message: "Success",
				description: "Product deleted successfully"
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
	useGetSalesProductsQuery,
	useGetSalesProductsByIdQuery,
	useCreateSalesProductsMutation,
	useEditSalesProductsMutation,
	useDeleteSalesProductsMutation
}
