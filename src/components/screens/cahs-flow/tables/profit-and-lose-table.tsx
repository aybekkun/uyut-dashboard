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
import { useTranslation } from "react-i18next"

interface Props {
	className?: string
}

const useProfitLoseColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<ProfitLose> = [
		{
			title: t("month"),
			dataIndex: "month",
			key: "month"
		},
		{
			title: t("total_sell"),
			dataIndex: "sell_amount",
			key: "sell_amount",
			render: formatPrice
		},
		{
			title: t("profit"),
			dataIndex: "profit",
			key: "profit",
			render: formatPrice
		},
		{
			title: t("expenses"),
			dataIndex: "expenses",
			key: "expenses",
			render: (value?: Expense[]) => (
				<Space>
					<Popover content={<ExpensesTable data={value || []} />}>
						<QuestionCircleOutlined style={{ cursor: "pointer" }} />
					</Popover>
				</Space>
			)
		}
	]

	return columns
}

export const ProfitLostTable: FC<Props> = () => {
	const { t } = useTranslation()
	const columns = useProfitLoseColumns()
	const { data: profitLose, isFetching, isLoading } = useGetProfitLoseQuery()
	return (
		<Table<ProfitLose>
			title={t("menu.profit_lost")}
			loading={isLoading || isFetching}
			columns={columns}
			dataSource={profitLose?.data}
			pagination={false}
		/>
	)
}
