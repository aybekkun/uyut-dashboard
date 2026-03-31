import { Form, FormProps } from "antd"
import { type FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FormDrawer } from "src/components/shared/form-drawer"
import { Input } from "src/components/ui"
import { FORM_DEFAULT } from "src/constants/form.constants"
import {
	ProductsCollar,
	type ProductsCollarForm,
	useCreateProductsCollarMutation,
	useEditProductsCollarMutation
} from "src/services/collar"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const ProductsCollarFormComponent: FC = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm<ProductsCollarForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addProductsCollar, isPending: addLoading } =
		useCreateProductsCollarMutation()

	const { mutate: editProductsCollar, isPending: editLoading } =
		useEditProductsCollarMutation()

	const onFinish: FormProps<ProductsCollarForm>["onFinish"] = async (values) => {
		if (isParamsFormValidate<ProductsCollar>(params)) {
			editProductsCollar(
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
		addProductsCollar(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<ProductsCollar>(params)) {
			form.setFieldsValue({
				...params
			})
		}
	}, [form, params])

	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"products-collar-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<ProductsCollarForm>
					name={"collar"}
					label={t("collar")}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { ProductsCollarFormComponent as ProductsCollarForm }
