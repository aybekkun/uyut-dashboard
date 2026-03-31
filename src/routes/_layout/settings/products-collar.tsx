import { createFileRoute } from "@tanstack/react-router"
import {
	ProductsCollarForm,
	ProductsCollarTable
} from "src/components/screens/products-collar"

export const Route = createFileRoute("/_layout/settings/products-collar")({
	component: ProductsCollarComponent
})

function ProductsCollarComponent() {
	return (
		<>
			<ProductsCollarForm />
			<ProductsCollarTable />
		</>
	)
}
