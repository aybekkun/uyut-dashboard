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
import { useTranslation } from "react-i18next"

interface Props {
	className?: string
}
const useCashFlowColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<CashFlow> = [
		{
			title: t("month"),
			dataIndex: "month",
			key: "month"
		},
		{
			title: t("start_remainder_amount"),
			dataIndex: "start_remainder_amount",
			key: "start_remainder_amount",
			render: formatPrice
		},
		{
			title: t("end_remainder_amount"),
			dataIndex: "end_remainder_amount",
			key: "end_remainder_amount",
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

export const CashflowTable: FC<Props> = () => {
	const { t } = useTranslation()
	const columns = useCashFlowColumns()
	const { data: cashFlow, isFetching, isLoading } = useGetCashFlowQuery()
	return (
		<Table<CashFlow>
			title={t("menu.cash_flow")}
			loading={isLoading || isFetching}
			columns={columns}
			dataSource={cashFlow?.data}
			pagination={false}
		/>
	)
}
