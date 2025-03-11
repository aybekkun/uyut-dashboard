import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/_layout/settings/")({
	component: IndexComponent,
	beforeLoad: () => {
		throw redirect({
			href: ROUTES.SETTINGS_PRINT_TYPES,
			replace: true
		})
	}
})

function IndexComponent() {
	return <Navigate to={ROUTES.SETTINGS_PRINT_TYPES} replace={true} />
}
