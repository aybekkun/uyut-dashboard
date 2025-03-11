import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ParamId } from "../params.types"
import type { ResponseError } from "../response.types"
import { paymentTypesService } from "./payment-types.service"

const useGetPaymentTypesQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => paymentTypesService.get(params),
		queryKey: ["payment-types", ...Object.values(params)],
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

const useGetPaymentTypesByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => paymentTypesService.getById(id),
		queryKey: ["payment-types", id],
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

const useCreatePaymentTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: paymentTypesService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["payment-types"]
			})
			message.success({
				message: "Success",
				description: "Payment type created successfully"
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

const useEditPaymentTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: paymentTypesService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["payment-types"]
			})
			message.success({
				message: "Success",
				description: "Payment type updated successfully"
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

const useDeletePaymentTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: paymentTypesService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["payment-types"]
			})
			message.success({
				message: "Success",
				description: "Payment type deleted successfully"
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
	useGetPaymentTypesQuery,
	useGetPaymentTypesByIdQuery,
	useCreatePaymentTypesMutation,
	useEditPaymentTypesMutation,
	useDeletePaymentTypesMutation
}
