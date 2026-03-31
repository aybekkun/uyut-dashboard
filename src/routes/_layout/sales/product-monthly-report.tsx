import { createFileRoute } from "@tanstack/react-router"
import { ProductMonthlyReportTable } from "src/components/screens/product-monthly-report"
import { ProductMonthlyReportParams } from "src/services/product-monthly-report"

export const Route = createFileRoute("/_layout/sales/product-monthly-report")({
	component: RouteComponent,
	validateSearch: (search: ProductMonthlyReportParams) => {
		const params: ProductMonthlyReportParams = {}
		if (search?.year) params.year = Number(search.year)
		if (search?.month) params.month = Number(search.month)
		return params
	}
})

function RouteComponent() {
	const params = Route.useSearch()
	const navigate = Route.useNavigate()

	const onChangeParams = (newParams: ProductMonthlyReportParams) => {
		navigate({
			search: (prev) => ({
				...prev,
				...newParams
			})
		})
	}

	return (
		<>
			<ProductMonthlyReportTable params={params} onChangeParams={onChangeParams} />
		</>
	)
}
