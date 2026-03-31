import { productsCollarService } from "./collar.service"
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ParamId, ResponseError } from "src/services/shared"

const useGetProductsCollarQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsCollarService.get(params),
		queryKey: ["products collar", ...Object.values(params)],
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

const useGetProductsCollarByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsCollarService.getById(id),
		queryKey: ["products collar", id],
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

const useCreateProductsCollarMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: productsCollarService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products collar"]
			})
			message.success({
				message: "Success",
				description: "Product collar created successfully"
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

const useEditProductsCollarMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: productsCollarService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products collar"]
			})
			message.success({
				message: "Success",
				description: "Product collar updated successfully"
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

const useDeleteProductsCollarMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: productsCollarService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products collar"]
			})
			message.success({
				message: "Success",
				description: "Product collar deleted successfully"
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
	useGetProductsCollarQuery,
	useGetProductsCollarByIdQuery,
	useCreateProductsCollarMutation,
	useEditProductsCollarMutation,
	useDeleteProductsCollarMutation
}
