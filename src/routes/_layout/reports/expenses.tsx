import { createFileRoute } from "@tanstack/react-router"
import { ExpensesTable } from "src/components/screens/expenses"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/reports/expenses")({
	component: ExpensesComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function ExpensesComponent() {
	const params = Route.useSearch()
	const navigate = Route.useNavigate()

	const onChangeParams = (params: GetParams) => {
		navigate({
			search: (prev) => ({
				...prev,
				...params
			})
		})
	}
	return (
		<>
			<ExpensesTable
				readonly={true}
				params={params}
				onChangeParams={onChangeParams}
			/>
		</>
	)
}
