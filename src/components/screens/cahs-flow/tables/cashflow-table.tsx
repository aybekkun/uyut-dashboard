import { ColumnsType } from "antd/es/table"
import { type FC } from "react"
import { useTranslation } from "react-i18next"
import { Table } from "src/components/ui"
import { useGetCashFlowQuery } from "src/services/cash-flow/cash-flow.service"
import "./cash.css"
const MONTH_KEYS = [
	"jan",
	"feb",
	"mar",
	"apr",
	"may",
	"jun",
	"jul",
	"aug",
	"sep",
	"oct",
	"nov",
	"dec"
]

interface Props {
	className?: string
}
/* const useCashFlowColumns = () => {
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
} */
type TableRow = {
	key: string
	category: string
	type: "start" | "income" | "purchase" | "expense-group" | "expense" | "end"
	values: number[]
}

export const CashflowTable: FC<Props> = () => {
	const { t } = useTranslation()
	const { data: cashFlow, isFetching, isLoading } = useGetCashFlowQuery()
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
			Math.abs(value)
		)

	const allExpenseNames = new Set<string>()
	cashFlow?.data.forEach((m) =>
		m.expenses.forEach((e) => allExpenseNames.add(e.name))
	)

	const rows: TableRow[] = []

	// Начальный остаток
	rows.push({
		key: "start",
		category: t("cashflow.start"),
		type: "start",
		values: cashFlow?.data.map((m) => Number(m.start_remainder_amount)) || []
	})

	// Доход
	rows.push({
		key: "income",
		category: t("cashflow.income"),
		type: "income",

		values: cashFlow?.data.map((m) => Number(m.sell_amount)) || []
	})

	// Закупки
	rows.push({
		key: "purchase",
		category: t("cashflow.purchase"),
		type: "purchase",
		values: cashFlow?.data.map((m) => Number(m.purchase_amount)) || []
	})

	// Расходы
	Array.from(allExpenseNames).forEach((name) => {
		rows.push({
			key: `expense-${name}`,
			category: name,
			type: "expense",
			values:
				cashFlow?.data.map((m) => {
					const expense = m.expenses.find((e) => e.name === name)
					return expense ? Number(expense.amount) : 0
				}) || []
		})
	})

	// Конечный остаток
	rows.push({
		key: "end",
		category: t("cashflow.end"),
		type: "end",
		values: cashFlow?.data.map((m) => Number(m.end_remainder_amount)) || []
	})

	const columns: ColumnsType<TableRow> = [
		{
			title: t("category"),
			dataIndex: "category",
			fixed: "left",
			width: 240,
			render: (value, row) => {
				if (row.type === "expense-group") {
					return <span className="expense-group-title">{value}</span>
				}

				if (row.type === "expense") {
					return <span className="expense-name">{value}</span>
				}

				return value
			},
			className: "category-cell"
		},
		...MONTH_KEYS.map((monthKey, index) => ({
			title: t(`months.${monthKey}`),
			dataIndex: ["values", index],
			align: "center" as const,
			render: (value: number, row: TableRow) => {
				if (!value) return "-"

				if (row.type === "income")
					return <span className="income">+{formatCurrency(value)}</span>
				if (row.type === "purchase")
					return <span className="expense">-{formatCurrency(value)}</span>
				if (row.type === "expense")
					return <span className="expense">-{formatCurrency(value)}</span>
				if (row.type === "end")
					return (
						<span className={value >= 0 ? "income" : "expense"}>
							{formatCurrency(value)}
						</span>
					)

				return formatCurrency(value)
			}
		}))
	]
	return (
		<Table
			loading={isLoading || isFetching}
			className="expense-calendar-card"
			columns={columns}
			dataSource={rows}
			pagination={false}
			bordered
			scroll={{ x: 1400 }}
			rowClassName={(row) => `row-${row.type}`}
		/>
	)
}
