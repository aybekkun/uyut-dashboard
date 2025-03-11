import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import { useMessage } from "src/hooks/use-message"
import { ParamId, ResponseError } from "src/services/shared"
import { printDetailsService } from "./print-details.service"

const useGetPrintDetailsByIdQuery = (id: ParamId) => {
	const { message } = useMessage()
	return useQuery({
		queryFn: () => printDetailsService.getById(id),
		queryKey: ["print-details", id],
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

const useEditPrintDetailsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: printDetailsService.edit,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products", "print-details"]
			})
			message.success({
				message: "Success",
				description: "Print detail edited successfully"
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

const useDeletePrintDetailsMutation = () => {
	const { message } = useMessage()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: printDetailsService.delete,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["products", "print-details"]
			})
			message.success({
				message: "Success",
				description: "Print detail deleted successfully"
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
	useGetPrintDetailsByIdQuery,
	useEditPrintDetailsMutation,
	useDeletePrintDetailsMutation
}
