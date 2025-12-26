import { Form, Select } from "antd"
import { useTranslation } from "react-i18next"
import { useGetProductsNameQuery } from "src/services/name"
import { ProductForm } from "src/services/products"

const FormItemName = ({
	onChangeProductsName
}: {
	onChangeProductsName: (val: string) => void
}) => {
	const {
		data: productsname,
		isLoading,
		isFetching
	} = useGetProductsNameQuery({})
	const { t } = useTranslation()
	return (
		<Form.Item<ProductForm>
			name={"name_id"}
			label={"Название"}
			rules={[{ required: true }]}>
			<Select
				onChange={onChangeProductsName}
				placeholder={t("select_placeholder")}
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
