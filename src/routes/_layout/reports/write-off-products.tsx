import { createFileRoute } from "@tanstack/react-router"
import { WriteOffProductsTable } from "src/components/screens/write-off-products"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/reports/write-off-products")({
	component: WriteOffProductsComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function WriteOffProductsComponent() {
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
			<WriteOffProductsTable
				readonly={true}
				params={params}
				onChangeParams={onChangeParams}
			/>
		</>
	)
}
