import { Form, Select } from "antd"
import { SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { ProductForm } from "src/services/products"
import { useGetProductsNameQuery } from "src/services/name"
import { useTranslation } from "react-i18next"

const FormItemName = ({
	onChangeProductsName
}: {
	onChangeProductsName: (val: string) => void
}) => {
	const { t } = useTranslation()
	const {
		data: productsname,
		isLoading,
		isFetching
	} = useGetProductsNameQuery({})
	return (
		<Form.Item<ProductForm>
			name={"name_id"}
			label={t("name")}
			rules={[{ required: true }]}>
			<Select
				onChange={onChangeProductsName}
				placeholder={SELECT_PLACEHOLDER}
				loading={isLoading || isFetching}
				 showSearch={true}
				optionFilterProp={"label"}
				/* onSearch={setSearchValue} */
				options={productsname?.data?.map((item) => ({
					value: item.id,
					label: item.name
				}))}
			/>
		</Form.Item>
	)
}

export default FormItemName
