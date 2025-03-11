import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ParamId, ResponseError } from "src/services/shared"
import { writeOffProductsService } from "./write-off-products.service"

const useGetWriteOffProductsQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => writeOffProductsService.get(params),
		queryKey: ["write-off-products", ...Object.values(params)],
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

const useGetWriteOffProductsByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => writeOffProductsService.getById(id),
		queryKey: ["write-off-products", id],
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

const useCreateWriteOffProductsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: writeOffProductsService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["write-off-products"]
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

const useEditWriteOffProductsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: writeOffProductsService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["write-off-products"]
			})
			message.success({
				message: "Success",
				description: "Product updated successfully"
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

const useDeleteWriteOffProductsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: writeOffProductsService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["write-off-products"]
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
	useGetWriteOffProductsQuery,
	useGetWriteOffProductsByIdQuery,
	useCreateWriteOffProductsMutation,
	useEditWriteOffProductsMutation,
	useDeleteWriteOffProductsMutation
}
