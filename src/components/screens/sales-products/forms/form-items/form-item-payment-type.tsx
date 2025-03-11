import { Form, Select } from "antd"
import { type FC } from "react"
import { SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { SalesProductForm } from "src/services/sales-products"
import { useGetPaymentTypesQuery } from "src/services/shared/payment-types"

const FormItemPaymentType: FC = () => {
	const {
		data: paymentTypes,
		isLoading,
		isFetching
	} = useGetPaymentTypesQuery({})
	return (
		<Form.Item<SalesProductForm>
			name={"payment_type_id"}
			label={"Тип оплаты"}
			rules={[{ required: true }]}>
			<Select
				placeholder={SELECT_PLACEHOLDER}
				loading={isLoading || isFetching}
				options={paymentTypes?.data?.map((paymentType) => ({
					value: paymentType.id,
					label: paymentType.name
				}))}
			/>
		</Form.Item>
	)
}

export { FormItemPaymentType }
