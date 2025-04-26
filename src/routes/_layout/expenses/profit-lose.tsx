import { createFileRoute } from "@tanstack/react-router"
import { ProfitLostTable } from "src/components/screens/cahs-flow/tables/profit-and-lose-table"

export const Route = createFileRoute("/_layout/expenses/profit-lose")({
	component: RouteComponent
})

function RouteComponent() {
	return <ProfitLostTable />
}
