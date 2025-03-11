import { Col, Form, type FormProps, Input, Row } from "antd"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared/form-drawer"
import { InputNumber, InputPrice } from "src/components/ui"
import { FORM_DEFAULT, INPUT_PLACEHOLDER } from "src/constants/form.constants"
import {
	type ProductForm,
	useCreateProductsMutation
} from "src/services/products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { FormItemPrice, FormItemSuppliers } from "./form-items"

const ProductsForm: FC = () => {
	const [form] = Form.useForm<ProductForm>()
	const metreWidth = Form.useWatch("width", form) || 0
	const metreLength = Form.useWatch("length", form) || 0

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
		form.setFieldValue("meter_square", metreWidth * metreLength)
	}, [form, metreLength, metreWidth])

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
				name={"product-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<ProductForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input placeholder={INPUT_PLACEHOLDER} />
				</Form.Item>
				<Row gutter={20} style={{ rowGap: 20 }}>
					<Col span={12}>
						<Form.Item<ProductForm>
							name={"width"}
							label={"Ширина"}
							rules={[{ required: true }]}>
							<InputPrice />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item<ProductForm>
							name={"length"}
							label={"Длина"}
							rules={[{ required: true }]}>
							<InputNumber />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item<ProductForm>
					name={"meter_square"}
					label={"Плошадь"}
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
