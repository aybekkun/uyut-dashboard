import { createFileRoute } from "@tanstack/react-router"
import {
	WriteOffProductsForm,
	WriteOffProductsTable
} from "src/components/screens/write-off-products"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/expenses/write-off-products")({
	component: WriteOffComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function WriteOffComponent() {
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
			<WriteOffProductsForm />
			<WriteOffProductsTable params={params} onChangeParams={onChangeParams} />
		</>
	)
}
