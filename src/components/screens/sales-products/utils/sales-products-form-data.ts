import { SalesProductForm } from "src/services/sales-products"
import { formatPhoneReverse } from "src/utils/formatter.utils"

const salesProductsFormData = (values: SalesProductForm): FormData => {
	const formData = new FormData()
	if (values.product_id) {
		formData.append("product_id", values.product_id.toString())
	}
	if (values.length) {
		formData.append("length", values.length.toString())
	}
	if (values.print_type_id) {
		formData.append("print_type_id", values.print_type_id.toString())
	}
	if (values.payment_type_id) {
		formData.append("payment_type_id", values.payment_type_id.toString())
	}
	if (values.full_name) {
		formData.append("full_name", values.full_name)
	}
	if (values.phone) {
		formData.append("phone", formatPhoneReverse(values.phone))
	}
	if (values.file && Array.isArray(values.file)) {
		const [file] = values.file
		if (file.originFileObj) {
			formData.append("file", file.originFileObj)
		}
	}
	return formData
}

export { salesProductsFormData }
