import { Form, FormProps } from "antd"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared/form-drawer"
import { Input } from "src/components/ui/input"
import { FORM_DEFAULT } from "src/constants/form.constants"
import {
	Supplier,
	SupplierForm,
	useCreateSuppliersMutation,
	useEditSuppliersMutation
} from "src/services/suppliers"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const SuppliersForm: FC = () => {
	const [form] = Form.useForm<SupplierForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addSupplier, isPending: addLoading } =
		useCreateSuppliersMutation()
	const { mutate: editSupplier, isPending: editLoading } =
		useEditSuppliersMutation()

	const onFinish: FormProps<SupplierForm>["onFinish"] = (values) => {
		if (isParamsFormValidate<Supplier>(params)) {
			editSupplier(
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
		addSupplier(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<Supplier>(params)) {
			form.setFieldsValue({
				...params
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"supplier-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<SupplierForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { SuppliersForm }
