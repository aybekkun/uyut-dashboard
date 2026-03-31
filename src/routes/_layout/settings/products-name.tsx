import { createFileRoute } from "@tanstack/react-router"
import {
	ProductsNameForm,
	ProductsNameTable
} from "src/components/screens/products-name"

export const Route = createFileRoute("/_layout/settings/products-name")({
	component: ProductsNameComponent
})

function ProductsNameComponent() {
	return (
		<>
			<ProductsNameForm />
			<ProductsNameTable />
		</>
	)
}
