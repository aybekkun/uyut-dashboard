import { api } from "src/api"
import { DashboardData, DashboardParams } from "src/services/dashboard/dashboard.types"
import { ResponseSingleData } from "src/services/shared"

class DashboardService {
	getMonthlyCashflow = async (params: DashboardParams): Promise<ResponseSingleData<DashboardData>> => {
		const response = await api.get("/monthly-cashflow", { params })
		return response.data
	}
}

export const dashboardService = new DashboardService()
