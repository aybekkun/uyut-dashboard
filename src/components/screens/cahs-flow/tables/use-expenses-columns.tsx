import {
	QuestionCircleOutlined
} from "@ant-design/icons"
import { Popover, Space } from "antd"
import { ColumnsType } from "antd/es/table"

import { Expense } from "src/services/expenses"

import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"
import { CashierMiniTable } from "../../expenses"


export const useExpensesColumns = () => {

	const columns: ColumnsType<Expense> = [
		{
			title: "Название",
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			title: "Тип расхода",
			dataIndex: ["expense_type", "name"],
			key: "expense_type",
			render: formatEmpty
		},
		{
			title: "Сумма",
			dataIndex: "amount",
			key: "amount",
			render: formatPriceUZS
		},
		{
			title: "Кассир",
			dataIndex: "cashier",
			key: "cashier",
			render: (value?: Expense["cashier"]) => (
				<Space align={"center"}>
					{formatEmpty(value?.name)}
					<Popover content={<CashierMiniTable data={value} />}>
						<QuestionCircleOutlined style={{ cursor: "pointer" }} />
					</Popover>
				</Space>
			)
		},
		{
			title: "Создан",
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		},
	
	]
	return columns
}
