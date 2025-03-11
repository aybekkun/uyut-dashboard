import { createFileRoute } from "@tanstack/react-router"
import {
	ExpenseTypesForm,
	ExpenseTypesTable
} from "src/components/screens/expense-types"

export const Route = createFileRoute("/_layout/settings/expense-types")({
	component: ExpenseTypesComponent
})

function ExpenseTypesComponent() {
	return (
		<>
			<ExpenseTypesForm />
			<ExpenseTypesTable />
		</>
	)
}
