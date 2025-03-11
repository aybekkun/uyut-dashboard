import { Form, type FormProps } from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared"
import { FormItemProducts } from "src/components/shared/form-items"
import { DatePicker, Input, InputNumber, InputPrice } from "src/components/ui"
import { FORM_DEFAULT, INPUT_PLACEHOLDER } from "src/constants/form.constants"
import {
	useCreateWriteOffProductsMutation,
	useEditWriteOffProductsMutation,
	type WriteOffProduct,
	type WriteOffProductForm
} from "src/services/write-off-products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatFormDate } from "src/utils/formatter.utils"
import { isParamsFormValidate } from "src/utils/validate.utils"

const WriteOffProductsForm: FC = () => {
	const [form] = Form.useForm<WriteOffProductForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addWriteOffProduct, isPending: addLoading } =
		useCreateWriteOffProductsMutation()

	const { mutate: editWriteOffProduct, isPending: editLoading } =
		useEditWriteOffProductsMutation()

	const onFinish: FormProps["onFinish"] = (values) => {
		if (values.date) {
			values.date = formatFormDate(values.date)
		}
		if (isParamsFormValidate<WriteOffProduct>(params)) {
			editWriteOffProduct(
				{
					...values,
					id: params.id
				},
				{
					onSuccess: () => {
						resetParams()
						form.resetFields()
					}
				}
			)
			return
		}
		addWriteOffProduct(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<WriteOffProduct>(params)) {
			form.setFieldsValue({
				...params,
				product_id: params?.product?.id,
				date: params.date ? dayjs(params.date) : undefined
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"write-off-product-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<WriteOffProductForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<FormItemProducts />
				<Form.Item<WriteOffProductForm>
					name={"length"}
					label={"Длина"}
					rules={[{ required: true }]}>
					<InputNumber placeholder={INPUT_PLACEHOLDER} />
				</Form.Item>
				<Form.Item<WriteOffProductForm>
					name={"amount"}
					label={"Сумма"}
					rules={[{ required: true }]}>
					<InputPrice />
				</Form.Item>
				<Form.Item<WriteOffProductForm>
					name={"date"}
					label={"Дата"}
					rules={[{ required: true }]}>
					<DatePicker />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { WriteOffProductsForm }
