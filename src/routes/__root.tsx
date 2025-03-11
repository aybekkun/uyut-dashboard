import { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import React from "react"
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { AuthContext } from "src/context/auth-context"

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				}))
			)

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
	auth?: AuthContext
}>()({
	component: RootComponent
})

function RootComponent() {
	return (
		<>
			<Outlet />
			<ReactQueryDevtools buttonPosition={"bottom-left"} />
			<TanStackRouterDevtools position={"bottom-right"} />
		</>
	)
}
