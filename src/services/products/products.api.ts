import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ParamId, ResponseError } from "../shared"
import type { PrintDetailForm } from "./print-details"
import { productsService } from "./products.service"

const useGetProductsQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsService.get(params),
		queryKey: ["products", ...Object.values(params)],
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

const useGetProductsByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsService.getById(id),
		queryKey: ["products", id],
		placeholderData: keepPreviousData,
		enabled: !!id,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error?.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}

const useGetProductsPrintDetailsByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => productsService.getPrintDetailsById(id),
		queryKey: ["products", "print-details", id],
		placeholderData: keepPreviousData,
		enabled: !!id,
		throwOnError: (error: ResponseError) => {
			message.error({
				message: error?.message,
				description: error?.response?.data?.message
			})
			throw error
		}
	})
}

const useCreateProductsPrintDetailsMutation = (id: ParamId) => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (form: PrintDetailForm) =>
			productsService.createPrintDetailsById(id, form),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products", "print-details"]
			})
			message.success({
				message: "Success",
				description: "Product detail created successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error?.message,
				description: error?.response?.data?.message
			})
		}
	})
}

const useCreateProductsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: productsService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products"]
			})
			message.success({
				message: "Success",
				description: "Product created successfully"
			})
		},
		onError: (error: ResponseError) => {
			message.error({
				message: error?.message,
				description: error?.response?.data?.message
			})
		}
	})
}

export {
	useGetProductsQuery,
	useGetProductsByIdQuery,
	useGetProductsPrintDetailsByIdQuery,
	useCreateProductsPrintDetailsMutation,
	useCreateProductsMutation
}
