import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "src/services/dashboard/dashboard.service"
import { DashboardParams } from "src/services/dashboard/dashboard.types"

const useGetMonthlyCashflowQuery = (params: DashboardParams) => {
	return useQuery({
		queryFn: () => dashboardService.getMonthlyCashflow(params),
		queryKey: ["dashboard", "monthly-cashflow", params],
	})
}

export { useGetMonthlyCashflowQuery }
