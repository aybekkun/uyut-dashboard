import { Form, Select } from "antd"
import { type FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useGetProductsQuery } from "src/services/products"

const FormItemProducts: FC = () => {
	const [params] = useState({
		page: 1,
		limit: 1000
	})

	const { t } = useTranslation()

	const { data: products, isLoading, isFetching } = useGetProductsQuery(params)

	return (
		<Form.Item<{
			product_id: number
		}>
			name={"product_id"}
			label={"Товар"}
			rules={[{ required: true }]}>
			<Select
				disabled={isLoading}
				showSearch={true}
				optionFilterProp={"label"}
				placeholder={t("select_placeholder")}
				loading={isLoading || isFetching}
				options={products?.data?.map((product) => ({
					value: product.id,
					label: product.name.name
				}))}
			/>
		</Form.Item>
	)
}

export { FormItemProducts }
