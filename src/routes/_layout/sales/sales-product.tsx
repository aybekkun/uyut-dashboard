import { createFileRoute } from "@tanstack/react-router"
import { SalesProduct } from "src/components/screens/sales-products/forms/sales-product"

export const Route = createFileRoute("/_layout/sales/sales-product")({
	component: RouteComponent
})

function RouteComponent() {
	return <SalesProduct />
}
