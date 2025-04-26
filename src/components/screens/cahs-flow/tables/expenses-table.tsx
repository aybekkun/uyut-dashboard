import type { FC } from "react"

import { Table } from "src/components/ui/table"
import { type Expense } from "src/services/expenses"

import { useExpensesColumns } from "./use-expenses-columns"

interface ExpensesTableProps {
	data: Expense[]
}

const ExpensesTable: FC<ExpensesTableProps> = ({ data }) => {
	const columns = useExpensesColumns()
	return (
		<>
			<Table<Expense>
				columns={columns}
				rowKey={(record) => record.id}
				title={"Расходы"}
				dataSource={data}
				pagination={false}
			/>
		</>
	)
}

export { ExpensesTable }
