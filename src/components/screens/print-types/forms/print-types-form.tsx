import { Form, FormProps, Input } from "antd"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared/form-drawer"
import { FORM_DEFAULT, INPUT_PLACEHOLDER } from "src/constants/form.constants"
import {
	PrintType,
	PrintTypeForm,
	useCreatePrintTypesMutation,
	useEditPrintTypesMutation
} from "src/services/shared/print-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const PrintTypesForm: FC = () => {
	const [form] = Form.useForm<PrintTypeForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addPrintType, isPending: addLoading } =
		useCreatePrintTypesMutation()

	const { mutate: editPrintType, isPending: editLoading } =
		useEditPrintTypesMutation()

	const onFinish: FormProps<PrintTypeForm>["onFinish"] = async (values) => {
		if (isParamsFormValidate<PrintType>(params)) {
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
				name={"print-type-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<PrintTypeForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input placeholder={INPUT_PLACEHOLDER} />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { PrintTypesForm }
