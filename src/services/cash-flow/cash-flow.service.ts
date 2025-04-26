import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { cashFlowService } from "./cash-flow.api"

const useGetCashFlowQuery = () => {
	return useQuery({
		queryFn: () => cashFlowService.get(),
		queryKey: ["cashflow"],
		placeholderData: keepPreviousData
	})
}

const useGetProfitLoseQuery = () => {
	return useQuery({
		queryFn: () => cashFlowService.getProfitLose(),
		queryKey: ["profitlose"],
		placeholderData: keepPreviousData
	})
}
export { useGetCashFlowQuery, useGetProfitLoseQuery }
