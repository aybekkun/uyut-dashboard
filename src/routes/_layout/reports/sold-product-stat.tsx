import { createFileRoute } from "@tanstack/react-router"
import { SoldProductStatTable } from "src/components/screens/sold-product-stat"
import { SoldProductStatParams } from "src/services/sold-product-stat"

export const Route = createFileRoute("/_layout/reports/sold-product-stat")({
	component: RouteComponent,
	validateSearch: (search: SoldProductStatParams) => {
		const params: SoldProductStatParams = {}
		if (search?.from_date) params.from_date = search.from_date
		if (search?.to_date) params.to_date = search.to_date
		return params
	}
})

function RouteComponent() {
	const params = Route.useSearch()
	const navigate = Route.useNavigate()

	const onChangeParams = (newParams: SoldProductStatParams) => {
		navigate({
			search: (prev) => ({
				...prev,
				...newParams
			})
		})
	}

	return (
		<>
			<SoldProductStatTable params={params} onChangeParams={onChangeParams} />
		</>
	)
}
