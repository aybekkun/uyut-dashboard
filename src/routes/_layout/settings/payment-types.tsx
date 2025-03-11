import { createFileRoute } from "@tanstack/react-router"
import {
	PaymentTypesForm,
	PaymentTypesTable
} from "src/components/screens/payment-types"

export const Route = createFileRoute("/_layout/settings/payment-types")({
	component: PaymentTypesComponent
})

function PaymentTypesComponent() {
	return (
		<>
			<PaymentTypesForm />
			<PaymentTypesTable />
		</>
	)
}
