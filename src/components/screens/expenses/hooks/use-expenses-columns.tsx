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
import { useTranslation } from "react-i18next"

export const useExpensesColumns = () => {
	const { mutate: deleteExpenseType } = useDeleteExpenseTypesMutation()
	const { t } = useTranslation()
	const editExpenseType = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<Expense> = [
		{
			title: t("name"),
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			title: t("expense_type"),
			dataIndex: ["expense_type", "name"],
			key: "expense_type",
			render: formatEmpty
		},
		{
			title: t("amount"),
			dataIndex: "amount",
			key: "amount",
			render: formatPriceUZS
		},
		{
			title: t("cashier"),
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
			title: t("created"),
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
						tooltip={t("edit")}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteExpenseType(record?.id)
						}}
						tooltip={t("delete")}
						danger={true}
						icon={<DeleteFilled />}
					/>
				</Space>
			)
		}
	]
	return columns
}
