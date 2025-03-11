import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { ParamId } from "src/services/shared/params.types"
import { ResponseError } from "src/services/shared/response.types"
import { printTypesService } from "./print-types.service"

const useGetPrintTypesQuery = (params: Record<string, unknown>) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => printTypesService.get(params),
		queryKey: ["print-types", ...Object.values(params)],
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

const useGetPrintTypesByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => printTypesService.getById(id),
		queryKey: ["print-types", id],
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

const useCreatePrintTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: printTypesService.create,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["print-types"]
			})
			message.success({
				message: "Success",
				description: "Print type created successfully"
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

const useEditPrintTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: printTypesService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["print-types"]
			})
			message.success({
				message: "Success",
				description: "Print type updated successfully"
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

const useDeletePrintTypesMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: printTypesService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["print-types"]
			})
			message.success({
				message: "Success",
				description: "Print type deleted successfully"
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
	useGetPrintTypesQuery,
	useGetPrintTypesByIdQuery,
	useCreatePrintTypesMutation,
	useEditPrintTypesMutation,
	useDeletePrintTypesMutation
}
