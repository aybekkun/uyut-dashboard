import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/dashboard")({
	component: DashboardComponent
})

function DashboardComponent() {
	return <div>Hello "/_layout/dashboard"!</div>
}
