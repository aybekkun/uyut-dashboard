import { Form, FormProps } from "antd"
import { type FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FormDrawer } from "src/components/shared/form-drawer"
import { Input } from "src/components/ui"
import { Switch } from "antd"
import { FORM_DEFAULT } from "src/constants/form.constants"
import {
	ProductsName,
	type ProductsNameForm,
	useCreateProductsNameMutation,
	useEditProductsNameMutation
} from "src/services/name"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const ProductsNameFormComponent: FC = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm<ProductsNameForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addProductsName, isPending: addLoading } =
		useCreateProductsNameMutation()

	const { mutate: editProductsName, isPending: editLoading } =
		useEditProductsNameMutation()

	const onFinish: FormProps<ProductsNameForm>["onFinish"] = async (values) => {
		if (isParamsFormValidate<ProductsName>(params)) {
			editProductsName(
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
		addProductsName(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<ProductsName>(params)) {
			form.setFieldsValue({
				...params
			})
		}
	}, [form, params])

	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"products-name-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<ProductsNameForm>
					name={"name"}
					label={t("name")}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item<ProductsNameForm>
					name={"is_collar"}
					label={t("is_collar")}
					valuePropName="checked">
					<Switch />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { ProductsNameFormComponent as ProductsNameForm }
