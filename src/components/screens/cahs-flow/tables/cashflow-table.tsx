import { QuestionCircleOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table"
import { type FC } from "react"
import { Table } from "src/components/ui"
import { CashFlow } from "src/services/cash-flow/cash-flow.api"
import { useGetCashFlowQuery } from "src/services/cash-flow/cash-flow.service"
import { Expense } from "src/services/expenses"
import { formatPrice } from "src/utils/formatter.utils"
import { ExpensesTable } from "./expenses-table"
import { Popover, Space } from "antd"

interface Props {
	className?: string
}

const columns: ColumnsType<CashFlow> = [
	{
		title: "Месяц",
		dataIndex: "month",
		key: "month"
	},
	{
		title: "Начальная сумма остатка",
		dataIndex: "start_remainder_amount",
		key: "start_remainder_amount",
		render: formatPrice
	},
	{
		title: "Конечная сумма остатка",
		dataIndex: "end_remainder_amount",
		key: "end_remainder_amount",
		render: formatPrice
	},
	{
		title: "Расходы",
		dataIndex: "expenses",
		key: "expenses",
		render: (value?: Expense[]) => {
			return (
				<Space>
					<Popover content={<ExpensesTable data={value || []} />}>
						<QuestionCircleOutlined style={{ cursor: "pointer" }} />
					</Popover>
				</Space>
			)
		}
	}
]

export const CashflowTable: FC<Props> = () => {
	const { data: cashFlow, isFetching, isLoading } = useGetCashFlowQuery()
	return (
		<Table<CashFlow>
			title={"Денежный поток"}
			loading={isLoading || isFetching}
			columns={columns}
			dataSource={cashFlow?.data}
			pagination={false}
		/>
	)
}
