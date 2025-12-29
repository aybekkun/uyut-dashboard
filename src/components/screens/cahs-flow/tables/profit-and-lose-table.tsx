import { ColumnsType } from "antd/es/table"
import { type FC } from "react"
import { useTranslation } from "react-i18next"
import { Table } from "src/components/ui"
import { useGetProfitLoseQuery } from "src/services/cash-flow/cash-flow.service"
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

type TableRow = {
	key: string
	category: string
	type: "income" | "purchase" | "expense" | "end"
	values: number[]
}

export const ProfitLostTable: FC<Props> = () => {
	const { t } = useTranslation()
	const { data: profitLose, isFetching, isLoading } = useGetProfitLoseQuery()

	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
			Math.abs(value)
		)

	const allExpenseNames = new Set<string>()
	profitLose?.data.forEach((m) =>
		m.expenses.forEach((e) => allExpenseNames.add(e.name))
	)

	const rows: TableRow[] = []

	// Выручка
	rows.push({
		key: "income",
		category: t("total_sell"),
		type: "income",
		values: profitLose?.data.map((m) => Number(m.sell_amount)) || []
	})

	// Закупки
	rows.push({
		key: "purchase",
		category: t("cashflow.purchase"),
		type: "purchase",
		values: profitLose?.data.map((m) => Number(m.purchase_amount)) || []
	})

	// Расходы
	Array.from(allExpenseNames).forEach((name) => {
		rows.push({
			key: `expense-${name}`,
			category: name,
			type: "expense",
			values:
				profitLose?.data.map((m) => {
					const expense = m.expenses.find((e) => e.name === name)
					return expense ? Number(expense.amount) : 0
				}) || []
		})
	})

	// Прибыль
	rows.push({
		key: "profit",
		category: t("profit"),
		type: "end",
		values: profitLose?.data.map((m) => Number(m.profit)) || []
	})

	const columns: ColumnsType<TableRow> = [
		{
			title: t("category"),
			dataIndex: "category",
			fixed: "left",
			width: 240,
			render: (value, row) => {
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
