import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import type { GetParams, ParamId, ResponseError } from "src/services/shared"
import { suppliersService } from "./suppliers.service"

const useGetSuppliersQuery = (params: GetParams) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => suppliersService.get(params),
		queryKey: ["suppliers", ...Object.values(params)],
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

const useGetSuppliersByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => suppliersService.getById(id),
		queryKey: ["suppliers", id],
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

const useCreateSuppliersMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: suppliersService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["suppliers"]
			})
			message.success({
				message: "Success",
				description: "Supplier created successfully"
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

const useEditSuppliersMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: suppliersService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["suppliers"]
			})
			message.success({
				message: "Success",
				description: "Supplier updated successfully"
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

const useDeleteSuppliersMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: suppliersService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["suppliers"]
			})
			message.success({
				message: "Success",
				description: "Supplier deleted successfully"
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
	useGetSuppliersQuery,
	useGetSuppliersByIdQuery,
	useCreateSuppliersMutation,
	useEditSuppliersMutation,
	useDeleteSuppliersMutation
}
