import { Form, FormProps, Select } from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FormDrawer } from "src/components/shared/form-drawer"
import { DatePicker, Input } from "src/components/ui"
import { InputPrice } from "src/components/ui/input-price"
import { FORM_DEFAULT } from "src/constants/form.constants"
import {
	type Expense,
	type ExpenseForm,
	useCreateExpensesMutation,
	useEditExpensesMutation
} from "src/services/expenses"
import { useGetExpenseTypesQuery } from "src/services/shared/expense-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatFormDate } from "src/utils/formatter.utils"
import { isParamsFormValidate } from "src/utils/validate.utils"

const ExpensesForm: FC = () => {
	const [form] = Form.useForm<ExpenseForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { t } = useTranslation()

	const {
		data: expenseTypes,
		isLoading: expenseTypesLoading,
		isFetching: expenseTypesFetching
	} = useGetExpenseTypesQuery({})

	const { mutate: addExpense, isPending: addLoading } =
		useCreateExpensesMutation()

	const { mutate: editExpense, isPending: editLoading } =
		useEditExpensesMutation()

	const onFinish: FormProps<ExpenseForm>["onFinish"] = (values) => {
		const data = {
			...values,
			expense_date: values.expense_date
				? formatFormDate(values.expense_date)
				: null
		}
		if (isParamsFormValidate<Expense>(params)) {
			editExpense(
				{
					...data,
					id: params.id
				},
				{
					onSuccess: () => {
						form.resetFields()
						resetParams()
					}
				}
			)
			return
		}
		addExpense(data, {
			onSuccess: () => {
				form.resetFields()
				resetParams()
			}
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<Expense>(params)) {
			form.setFieldsValue({
				...params,
				expense_id: params?.expense_type?.id,
				expense_date: params.expense_date ? dayjs(params.expense_date) : null
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"expense-form"}
				form={form}
				initialValues={{ expense_date: dayjs() }}
				onFinish={onFinish}>
				<Form.Item<ExpenseForm>
					name={"name"}
					label={t("name")}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item<ExpenseForm>
					name={"expense_id"}
					label={t("expense_type")}
					rules={[{ required: true }]}>
					<Select
						loading={expenseTypesLoading || expenseTypesFetching}
						showSearch={true}
						optionFilterProp={"label"}
						options={expenseTypes?.data?.map((expenseType) => ({
							value: expenseType?.id,
							label: expenseType?.name
						}))}
						placeholder={t("select_placeholder")}
					/>
				</Form.Item>
				<Form.Item<ExpenseForm>
					name={"amount"}
					label={t("amount")}
					rules={[{ required: true }]}>
					<InputPrice />
				</Form.Item>
				<Form.Item<ExpenseForm> name={"expense_date"} label={t("expense_date")}>
					<DatePicker />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { ExpensesForm }
