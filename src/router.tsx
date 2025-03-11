import { LoadingOutlined } from "@ant-design/icons"
import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { Spin } from "antd"
import { DefaultCatchBoundary } from "src/components/layout/default-catch-boundary"
import { NotFound } from "src/components/layout/not-found"
import { queryClient } from "src/config/react-query.config"
import { routeTree } from "./routeTree.gen"

// Set up a Router instance
export const router = createTanStackRouter({
	routeTree,
	context: {
		queryClient: queryClient,
		auth: undefined
	},
	defaultPreload: "intent",
	defaultErrorComponent: DefaultCatchBoundary,
	defaultPendingComponent: () => (
		<Spin
			spinning={true}
			fullscreen={true}
			size={"large"}
			indicator={<LoadingOutlined spin={true} style={{ color: "#ffffff" }} />}
		/>
	),
	defaultNotFoundComponent: (props) => <NotFound {...props} />
})

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
