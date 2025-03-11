import {
	DeleteFilled,
	EditFilled,
	QuestionCircleOutlined
} from "@ant-design/icons"
import { Popover, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import { Expense } from "src/services/expenses"
import { useDeleteExpenseTypesMutation } from "src/services/shared/expense-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"
import { CashierMiniTable } from "../ui/cashier-mini-table"

export const useExpensesColumns = () => {
	const { mutate: deleteExpenseType } = useDeleteExpenseTypesMutation()

	const editExpenseType = useFormDevtoolsStore((state) => state.setParams)

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
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editExpenseType(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteExpenseType(record?.id)
						}}
						tooltip={"Удалить"}
						danger={true}
						icon={<DeleteFilled />}
					/>
				</Space>
			)
		}
	]
	return columns
}
