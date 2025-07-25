import { Form, Select } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { useGetColorsQuery } from "src/services/colors"
import { ProductForm } from "src/services/products"

const FormItemColors: FC = () => {
	const { t } = useTranslation()
	const { data: colors, isLoading, isFetching } = useGetColorsQuery({})

	return (
		<>
			<Form.Item<ProductForm>
				name={"collar_id"}
				label={t("colors")}
				rules={[{ required: true }]}>
				<Select
					placeholder={SELECT_PLACEHOLDER}
					loading={isLoading || isFetching}
					showSearch={true}
					optionFilterProp={"label"}
					/* onSearch={setSearchValue} */
					options={colors?.data?.map((color) => ({
						value: color.id,
						label: color.collar
					}))}
				/>
			</Form.Item>
		</>
	)
}

export default FormItemColors
