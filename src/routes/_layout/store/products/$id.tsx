import { createFileRoute } from "@tanstack/react-router"
import { ProductTable } from "src/components/screens/product"
import { GetParams } from "src/services/shared"

export const Route = createFileRoute("/_layout/store/products/$id")({
	component: ProductComponent,
	validateSearch: (search: GetParams) => {
		const params: GetParams = {}
		if (search?.page) params.page = search.page
		if (search?.limit) params.limit = search.limit
		return params
	}
})

function ProductComponent() {
	const { id } = Route.useParams()
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
			<ProductTable id={id} params={params} onChangeParams={onChangeParams} />
		</>
	)
}
