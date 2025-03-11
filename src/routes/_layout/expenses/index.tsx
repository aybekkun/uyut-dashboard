import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/_layout/expenses/")({
	component: IndexComponent,
	beforeLoad: () => {
		throw redirect({
			href: ROUTES.EXPENSES_LIST,
			replace: true
		})
	}
})

function IndexComponent() {
	return <Navigate to={ROUTES.EXPENSES_LIST} replace={true} />
}
