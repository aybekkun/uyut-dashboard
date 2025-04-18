import { Form, type FormProps /* Input */ /* Select */ } from "antd"
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

const ProductsForm: FC = () => {
	const [form] = Form.useForm<ProductForm>()
	const [productsNameId, setProductsNameId] = useState(0)
	const isColor = ![2, 4].includes(productsNameId)
	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addProduct, isPending: addLoading } =
		useCreateProductsMutation()

	const onFinish: FormProps<ProductForm>["onFinish"] = (values) => {
		addProduct(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				...params
			})
		}
	}, [form, params])

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
					label={"Количество Роллов"}
					rules={[{ required: true }]}>
					<InputNumber />
				</Form.Item>
				<FormItemPrice form={form} />
				<FormItemSuppliers />
			</Form>
		</FormDrawer>
	)
}

export { ProductsForm }
