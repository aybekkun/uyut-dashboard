import { DatePicker, Form, type FormProps /* Input */ /* Select */ } from "antd"
import { type FC, useEffect } from "react"
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

import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import { FormItemMeasurementUnits } from "./form-items/form-item-measurement_units"
import FormItemName from "./form-items/form-item-name"

import { useGetProductsNameQuery } from "src/services/name"
import {
	formatProductAmount,
	getProductMultiplier,
	getProductUnit
} from "src/utils/product.utils"

const ProductsForm: FC = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm<ProductForm>()
	const nameId = Form.useWatch("name_id", form)
	const measurementUnitId = Form.useWatch("measurement_unit_id", form)
	const isColor = measurementUnitId === 1
	const { params, resetParams } = useFormDevtoolsStore()

	const { data: productsName } = useGetProductsNameQuery({})

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

	const calculateAmount = () => {
		if (typeof rolls !== "number") return null

		const selectedName = productsName?.data?.find(
			(item) => item.id === Number(nameId)
		)
		if (!selectedName) return null

		const nameString = String(selectedName.name)
		const unit = getProductUnit(nameString, selectedName.id)

		if (unit === "м") {
			const amount = rolls * 100 // Default 100 if not specified
			return formatProductAmount(amount, "м")
		}

		if (unit === "м²") {
			const multiplier = getProductMultiplier(nameString)
			const amount = rolls * 100 * multiplier
			return formatProductAmount(amount, "м²")
		}

		return formatProductAmount(rolls, "шт")
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
				<FormItemName />

				<FormItemMeasurementUnits />

				{isColor && <FormItemColors />}

				<Form.Item<ProductForm>
					name={"rolls"}
					label={t("number_of_rolls")}
					rules={[{ required: true }]}>
					<InputNumber />
				</Form.Item>
				{typeof rolls === "number" && (
					<div style={{ marginBottom: "16px" }}>{calculateAmount()}</div>
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
