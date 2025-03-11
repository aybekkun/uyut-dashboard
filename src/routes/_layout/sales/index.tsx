import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/_layout/sales/")({
	component: IndexComponent,
	beforeLoad: () => {
		throw redirect({
			href: ROUTES.SALES_PRODUCTS,
			replace: true
		})
	}
})

function IndexComponent() {
	return <Navigate to={ROUTES.SALES_PRODUCTS} replace={true} />
}
