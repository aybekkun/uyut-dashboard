import { DatePicker, Form, type FormProps /* Input */ /* Select */ } from "antd"
import { type FC, useEffect, useState } from "react"
import { FormDrawer } from "src/components/shared/form-drawer"
import { InputNumber /* InputPrice */ } from "src/components/ui"
import {
	FORM_DEFAULT /* INPUT_PLACEHOLDER */
} from "src/constants/form.constants"
import {
	type ProductForm,
	useCreateProductsMutation
} from "src/services/products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { FormItemPrice, FormItemSuppliers } from "./form-items"
import FormItemColors from "./form-items/form-item-colors"

import FormItemName from "./form-items/form-item-name"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"

const ProductsForm: FC = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm<ProductForm>()
	const [productsNameId, setProductsNameId] = useState(0)
	const isColor = ![2, 4].includes(productsNameId)
	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addProduct, isPending: addLoading } =
		useCreateProductsMutation()

	const onFinish: FormProps<ProductForm>["onFinish"] = (values) => {
		addProduct(
			{
				...values,
				imported_at: dayjs(values.imported_at).format("YYYY-MM-DDTHH:mm:ssZ")
			},
			{
				onSuccess: () => {
					resetParams()
					form.resetFields()
				}
			}
		)
	}

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				...params
			})
		}
	}, [form, params])
	const rolls = Form.useWatch("rolls", form)
	const calculateMeters = () => {
		if (typeof rolls !== "number") return null

		if (productsNameId === 2) return rolls * 250
		if (productsNameId === 4) return rolls * 2.5
		return rolls * 100
	}
	return (
		<FormDrawer width={400} form={form} isLoading={addLoading}>
			<Form
				{...FORM_DEFAULT}
				initialValues={{ length: 100 }}
				name={"product-form"}
				form={form}
				onFinish={onFinish}>
				{/* 	<Form.Item<ProductForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input placeholder={INPUT_PLACEHOLDER} />
				</Form.Item> */}
				<FormItemName
					onChangeProductsName={(val) => setProductsNameId(Number(val))}
				/>

				{isColor && <FormItemColors />}

				<Form.Item<ProductForm>
					name={"rolls"}
					label={t("number_of_rolls")}
					rules={[{ required: true }]}>
					<InputNumber />
				</Form.Item>
				{typeof rolls === "number" && (
					<div style={{ marginBottom: "16px" }}>{calculateMeters()}</div>
				)}

				<FormItemPrice form={form} />
				<FormItemSuppliers />
				<Form.Item
					name="imported_at"
					label={t("date")}
					rules={[{ required: true, message: "Выберите дату и время" }]}>
					<DatePicker showTime={true} style={{ width: "100%" }} />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { ProductsForm }
