import { createFileRoute } from "@tanstack/react-router"
import {
	ProductDescription,
	ProductDetailsForm,
	ProductDetailsTable
} from "src/components/screens/product"

export const Route = createFileRoute("/_layout/store/products/$id")({
	component: ProductComponent
})

function ProductComponent() {
	const { id } = Route.useParams()
	return (
		<>
			<ProductDetailsForm id={id} />
			<ProductDescription id={id} />
			<ProductDetailsTable id={id} />
		</>
	)
}
