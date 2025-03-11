import { PlusOutlined } from "@ant-design/icons"
import type { FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import { type Expense, useGetExpensesQuery } from "src/services/expenses"
import { GetParams } from "src/services/shared"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useExpensesColumns } from "../hooks/use-expenses-columns"

interface ExpensesTableProps {
	params: GetParams
	onChangeParams: (params: GetParams) => void
	readonly?: boolean
}

const ExpensesTable: FC<ExpensesTableProps> = ({
	readonly,
	params,
	onChangeParams
}) => {
	const { page, limit } = params

	const {
		data: expenses,
		isLoading,
		isFetching
	} = useGetExpensesQuery({
		page: page || 1,
		limit: limit || 10
	})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useExpensesColumns()
	return (
		<>
			<Table<Expense>
				rowKey={(record) => record.id}
				title={"Расходы"}
				extra={
					readonly ? null : (
						<Button icon={<PlusOutlined />} onClick={toggleForm}>
							Добавить
						</Button>
					)
				}
				columns={columns.filter((el) => (readonly ? el.key !== "actions" : el))}
				loading={isLoading || isFetching}
				dataSource={expenses?.data}
				pagination={{
					total: expenses?.pagination?.count,
					onChange: (page, limit) => {
						onChangeParams({ page, limit })
					}
				}}
			/>
		</>
	)
}

export { ExpensesTable }
