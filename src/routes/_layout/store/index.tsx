import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/_layout/store/")({
	component: IndexComponent,
	beforeLoad: () => {
		throw redirect({
			href: ROUTES.STORE_PRODUCTS
		})
	}
})

function IndexComponent() {
	return <Navigate to={ROUTES.STORE_PRODUCTS} replace={true} />
}
