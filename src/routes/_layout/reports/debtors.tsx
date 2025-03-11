import { createFileRoute } from "@tanstack/react-router"
import { DebtorsTable } from "src/components/screens/debtors"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/reports/debtors")({
	component: DebtorsComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function DebtorsComponent() {
	return (
		<>
			<DebtorsTable />
		</>
	)
}
