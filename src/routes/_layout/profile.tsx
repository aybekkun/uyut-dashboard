import { createFileRoute } from "@tanstack/react-router"
import { ProfileDescription } from "src/components/screens/profile"

export const Route = createFileRoute("/_layout/profile")({
	component: ProfileComponent
})

function ProfileComponent() {
	return (
		<>
			<ProfileDescription />
		</>
	)
}
