import { createFileRoute } from "@tanstack/react-router"
import { ExpensesForm, ExpensesTable } from "src/components/screens/expenses"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/expenses/list")({
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
			<ExpensesForm />
			<ExpensesTable params={params} onChangeParams={onChangeParams} />
		</>
	)
}
