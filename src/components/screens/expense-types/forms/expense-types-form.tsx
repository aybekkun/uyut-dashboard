import { Form, FormProps } from "antd"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared/form-drawer"
import { Input } from "src/components/ui"
import { FORM_DEFAULT } from "src/constants/form.constants"
import {
	ExpenseType,
	type ExpenseTypeForm,
	useCreateExpenseTypesMutation,
	useEditExpenseTypesMutation
} from "src/services/shared/expense-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const ExpenseTypesForm: FC = () => {
	const [form] = Form.useForm<ExpenseTypeForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addPrintType, isPending: addLoading } =
		useCreateExpenseTypesMutation()

	const { mutate: editPrintType, isPending: editLoading } =
		useEditExpenseTypesMutation()

	const onFinish: FormProps<ExpenseTypeForm>["onFinish"] = async (values) => {
		if (isParamsFormValidate<ExpenseType>(params)) {
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
		if (isParamsFormValidate<ExpenseType>(params)) {
			form.setFieldsValue({
				...params
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"expense-type-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<ExpenseTypeForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { ExpenseTypesForm }
