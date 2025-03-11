import { createFileRoute } from "@tanstack/react-router"
import {
	PrintTypesForm,
	PrintTypesTable
} from "src/components/screens/print-types"

export const Route = createFileRoute("/_layout/settings/print-types")({
	component: PrintTypesComponent
})

function PrintTypesComponent() {
	return (
		<>
			<PrintTypesForm />
			<PrintTypesTable />
		</>
	)
}
