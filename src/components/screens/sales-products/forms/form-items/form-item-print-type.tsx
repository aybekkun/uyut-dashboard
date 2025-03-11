import { Form, FormInstance, Select } from "antd"
import { type  FC } from "react"
import { SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { useGetProductsPrintDetailsByIdQuery } from "src/services/products"
import { SalesProductForm } from "src/services/sales-products"

interface FormItemPrintTypeProps {
	form: FormInstance<SalesProductForm>
}

const FormItemPrintType: FC<FormItemPrintTypeProps> = ({ form }) => {
	
	const productId = Form.useWatch("product_id", form)
	
	const {
		data: printDetails,
		isLoading,
		isFetching
	} = useGetProductsPrintDetailsByIdQuery(productId)
	
	return (
		<Form.Item<SalesProductForm>
			name={"print_type_id"}
			label={"Тип печати"}
			rules={[{ required: true }]}
		>
			<Select
				placeholder={SELECT_PLACEHOLDER}
				loading={isLoading || isFetching}
				disabled={!productId}
				options={printDetails?.data?.map((print) => ({
					value: print?.print_type?.id,
					label: print?.print_type?.name
				}))}
			/>
		</Form.Item>
	)
}

export { FormItemPrintType }
