import { Form, FormProps } from "antd"
import { type FC } from "react"
import { useTranslation } from "react-i18next"
import { FormDrawer } from "src/components/shared/form-drawer"
import { InputPrice } from "src/components/ui"
import { FORM_DEFAULT } from "src/constants/form.constants"
import { Debtor, DebtorForm, useCreateDebtorMutation } from "src/services/debtors"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const DebtorsForm: FC = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm<DebtorForm>()

	const { params, resetParams } = useFormDevtoolsStore()
	const { mutate: addDebtors, isPending: addLoading } = useCreateDebtorMutation()

	const onFinish: FormProps<DebtorForm>["onFinish"] = async (values) => {
		if (!isParamsFormValidate<Debtor>(params)) return
	  
		addDebtors(
		  {
			sell_id: String(params.sell.id),
			client_id: String(params.client.id),
			paid_amount: String(values.paid_amount),
		  },
		  {
			onSuccess: () => {
			  form.resetFields()
			  resetParams()
			},
		  },
		)
	  }
	  

	return (
		<FormDrawer form={form} isLoading={addLoading}>
			<Form
				{...FORM_DEFAULT}
				name="debtors-form"
				form={form}
				onFinish={onFinish}
			>
				<Form.Item<DebtorForm>
					name="paid_amount"
					label={t("paid_amount")}
					rules={[{ required: true }]}
				>
					<InputPrice />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { DebtorsForm }

