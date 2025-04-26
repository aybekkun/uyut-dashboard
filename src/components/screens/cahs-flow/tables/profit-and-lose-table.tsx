import { QuestionCircleOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table"
import { type FC } from "react"
import { Table } from "src/components/ui"
import { ProfitLose } from "src/services/cash-flow/cash-flow.api"
import { useGetProfitLoseQuery } from "src/services/cash-flow/cash-flow.service"
import { Expense } from "src/services/expenses"
import { formatPrice } from "src/utils/formatter.utils"
import { ExpensesTable } from "./expenses-table"
import { Popover, Space } from "antd"

interface Props {
	className?: string
}

const columns: ColumnsType<ProfitLose> = [
	{
		title: "Месяц",
		dataIndex: "month",
		key: "month"
	},
	{
		title: "Общая продожа",
		dataIndex: "sell_amount",
		key: "sell_amount",
		render: formatPrice
	},
	{
		title: "Прибыль",
		dataIndex: "profit",
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

export const ProfitLostTable: FC<Props> = () => {
	const { data: profitLose, isFetching, isLoading } = useGetProfitLoseQuery()
	return (
		<Table<ProfitLose>
			title={"Денежный поток"}
			loading={isLoading || isFetching}
			columns={columns}
			dataSource={profitLose?.data}
			pagination={false}
		/>
	)
}
