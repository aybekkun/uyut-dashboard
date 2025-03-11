import { createFileRoute } from "@tanstack/react-router"
import {
	SuppliersForm,
	SuppliersStable
} from "src/components/screens/suppliers"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/reports/suppliers")({
	component: SuppliersComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function SuppliersComponent() {
	return (
		<>
			<SuppliersForm />
			<SuppliersStable />
		</>
	)
}
