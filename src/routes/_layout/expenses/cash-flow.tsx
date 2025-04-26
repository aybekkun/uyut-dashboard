import { createFileRoute } from "@tanstack/react-router"
import { CashflowTable } from "src/components/screens/cahs-flow/tables/cashflow-table"

export const Route = createFileRoute("/_layout/expenses/cash-flow")({
	component: RouteComponent
})

function RouteComponent() {
	return <CashflowTable />
}
