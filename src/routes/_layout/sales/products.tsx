import { createFileRoute } from "@tanstack/react-router"
import { SalesProductsForm, SalesProductsTable } from "src/components/screens/sales-products"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/sales/products")({
	component: ProductsComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function ProductsComponent() {
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
			<SalesProductsForm />
			<SalesProductsTable params={params} onChangeParams={onChangeParams} />
		</>
	)
}
