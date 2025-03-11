import { Form, FormProps, Input } from "antd"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared/form-drawer"
import { FORM_DEFAULT, INPUT_PLACEHOLDER } from "src/constants/form.constants"
import {
	PaymentType,
	type PaymentTypeForm,
	useCreatePaymentTypesMutation,
	useEditPaymentTypesMutation
} from "src/services/shared/payment-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const PaymentTypesForm: FC = () => {
	const [form] = Form.useForm<PaymentTypeForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addPrintType, isPending: addLoading } =
		useCreatePaymentTypesMutation()
	const { mutate: editPrintType, isPending: editLoading } =
		useEditPaymentTypesMutation()

	const onFinish: FormProps<PaymentTypeForm>["onFinish"] = async (values) => {
		if (isParamsFormValidate<PaymentType>(params)) {
			editPrintType(
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
		addPrintType(values, {
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
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"payment-type-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<PaymentTypeForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input placeholder={INPUT_PLACEHOLDER} />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { PaymentTypesForm }
