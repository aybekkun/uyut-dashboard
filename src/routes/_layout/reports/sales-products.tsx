import { createFileRoute } from "@tanstack/react-router"
import { SalesProductsTable } from "src/components/screens/sales-products"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/reports/sales-products")({
	component: SalesProductsComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function SalesProductsComponent() {
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
			<SalesProductsTable
				readonly={true}
				params={params}
				onChangeParams={onChangeParams}
			/>
		</>
	)
}
