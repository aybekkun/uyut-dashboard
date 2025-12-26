
import { useMessage } from "src/hooks/use-message"
import { measurementUnitsService } from "./measurement-units.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ResponseError } from "../response.types"

const useGetMeasurementUnitsQuery = () => {
    const { message } = useMessage()
    return useQuery({
        queryFn: () => measurementUnitsService.get(),
        queryKey: ["measurement_units"],
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

export { useGetMeasurementUnitsQuery }