import { createFileRoute, redirect } from "@tanstack/react-router"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/_layout/")({
	component: HomeComponent,
	beforeLoad: () => {
		throw redirect({
			href: ROUTES.STORE_PRODUCTS,
			replace: true
		})
	}
})

function HomeComponent() {
	return (
		<>
			{/*<Navigate to={ROUTES.STORE_PRODUCTS} replace={true} />*/}
			<h1>Home</h1>
		</>
	)
}
