import { createFileRoute } from "@tanstack/react-router"
import { UsersForm, UsersTable } from "src/components/screens/users"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/employees/users")({
	component: UsersComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function UsersComponent() {
	return (
		<>
			<UsersForm />
			<UsersTable />
		</>
	)
}
