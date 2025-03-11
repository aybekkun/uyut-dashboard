import { Form, FormProps, Select } from "antd"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared/form-drawer"
import { Input } from "src/components/ui/input"
import { InputPrice } from "src/components/ui/input-price"
import { FORM_DEFAULT, SELECT_PLACEHOLDER } from "src/constants/form.constants"
import {
	type Expense,
	type ExpenseForm,
	useCreateExpensesMutation,
	useEditExpensesMutation
} from "src/services/expenses"
import { useGetExpenseTypesQuery } from "src/services/shared/expense-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

const ExpensesForm: FC = () => {
	const [form] = Form.useForm<ExpenseForm>()

	const { params, resetParams } = useFormDevtoolsStore()

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
		if (isParamsFormValidate<Expense>(params)) {
			editExpense(
				{
					...values,
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
		addExpense(values, {
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
				expense_id: params?.expense_type?.id
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"expense-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<ExpenseForm>
					name={"name"}
					label={"Название"}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item<ExpenseForm>
					name={"expense_id"}
					label={"Тип расхода"}
					rules={[{ required: true }]}>
					<Select
						loading={expenseTypesLoading || expenseTypesFetching}
						showSearch={true}
						optionFilterProp={"label"}
						options={expenseTypes?.data?.map((expenseType) => ({
							value: expenseType?.id,
							label: expenseType?.name
						}))}
						placeholder={SELECT_PLACEHOLDER}
					/>
				</Form.Item>
				<Form.Item<ExpenseForm>
					name={"amount"}
					label={"Сумма"}
					rules={[{ required: true }]}>
					<InputPrice />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { ExpensesForm }
