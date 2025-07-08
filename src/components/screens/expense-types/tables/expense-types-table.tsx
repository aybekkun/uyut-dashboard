import { PlusOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import {
	ExpenseType,
	useGetExpenseTypesQuery
} from "src/services/shared/expense-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useExpenseTypesColumns } from "../hooks/use-expense-types-columns"
import { useTranslation } from "react-i18next"

const ExpenseTypesTable: FC = () => {
	const { t } = useTranslation()
	const {
		data: printTypes,
		isLoading,
		isFetching
	} = useGetExpenseTypesQuery({})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useExpenseTypesColumns()
	return (
		<>
			<Table<ExpenseType>
				rowKey={(record) => record.id}
				title={t("menu.settings_expense_types")}
				extra={
					<Button icon={<PlusOutlined />} onClick={toggleForm}>
						{t("add")}
					</Button>
				}
				loading={isLoading || isFetching}
				columns={columns}
				dataSource={printTypes?.data}
			/>
		</>
	)
}

export { ExpenseTypesTable }
