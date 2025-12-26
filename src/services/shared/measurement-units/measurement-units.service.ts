import { api } from "src/api"
import { Response } from "../response.types"
import { MeasurementUnits } from "./measurement-units.types"

class MeasurementUnitsService {
    get = async (): Promise<Response<MeasurementUnits>> => {
        const response = await api.get("/measurement-unit")
        return response.data
    }
}

export const measurementUnitsService = new MeasurementUnitsService()