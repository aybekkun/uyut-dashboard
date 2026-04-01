import { createFileRoute } from "@tanstack/react-router"
import { PrintMonthlyReportTable } from "src/components/screens/print-monthly-report"
import { PrintMonthlyReportParams } from "src/services/print-monthly-report"

export const Route = createFileRoute("/_layout/sales/print-monthly-report")({
	component: RouteComponent,
	validateSearch: (search: PrintMonthlyReportParams) => {
		const params: PrintMonthlyReportParams = {}
		if (search?.year) params.year = Number(search.year)
		if (search?.month) params.month = Number(search.month)
		return params
	}
})

function RouteComponent() {
	const params = Route.useSearch()
	const navigate = Route.useNavigate()

	const onChangeParams = (newParams: PrintMonthlyReportParams) => {
		navigate({
			search: (prev) => ({
				...prev,
				...newParams
			})
		})
	}

	return (
		<>
			<PrintMonthlyReportTable params={params} onChangeParams={onChangeParams} />
		</>
	)
}
