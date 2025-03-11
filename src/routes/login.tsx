import { createFileRoute, redirect } from "@tanstack/react-router"
import { LoginForm, LoginLayout } from "src/components/screens/login"
import { ROUTES } from "src/config/routes.config"

export const Route = createFileRoute("/login")({
	component: LoginComponent,
	beforeLoad: ({ context, search }) => {
		const pathname = ("redirect" in search && typeof search.redirect === "string") ? search["redirect"] : null
		if (context?.auth?.isAuth) {
			throw redirect({
				to: pathname || ROUTES.HOME,
			})
		}
	}
})

function LoginComponent() {
	return (
		<LoginLayout>
			<LoginForm />
		</LoginLayout>
	)
}
