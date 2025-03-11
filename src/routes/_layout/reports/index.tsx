import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/_layout/reports/")({
	component: IndexComponent,
	beforeLoad: () => {
		throw redirect({
			href: ROUTES.REPORT_PRODUCTS,
			replace: true
		})
	}
})

function IndexComponent() {
	return <Navigate to={ROUTES.REPORT_PRODUCTS} replace={true} />
}
