import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/_layout/employees/")({
	component: IndexComponent,
	beforeLoad: () => {
		throw redirect({
			href: ROUTES.EMPLOYEES_USERS,
			replace: true
		})
	}
})

function IndexComponent() {
	return <Navigate to={ROUTES.EMPLOYEES_USERS} replace={true} />
}
