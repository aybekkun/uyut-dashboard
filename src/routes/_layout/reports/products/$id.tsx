import { createFileRoute } from "@tanstack/react-router"
import {
	ProductDescription,
	ProductDetailsTable
} from "src/components/screens/product"

export const Route = createFileRoute("/_layout/reports/products/$id")({
	component: ProductComponent
})

function ProductComponent() {
	const { id } = Route.useParams()

	return (
		<>
			<ProductDescription id={id} />
			<ProductDetailsTable id={id} readonly={true} />
		</>
	)
}
