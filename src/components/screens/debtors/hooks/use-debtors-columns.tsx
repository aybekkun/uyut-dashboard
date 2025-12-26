import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Popover, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { ClientTable } from "src/components/shared/client"
import type { SalesProduct } from "src/services/sales-products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import {
	formateHHDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"
import { SalesProductsTableList } from "../../sales-products/tables/sales-products-table-list"
import { TransactionsTable } from "../tables/transactions-table"
import { UseDebtorsColumnDueDatePicker } from "./use-debtors-column-due-date-picker"

export const useDebtorsColumns = () => {
	const { t } = useTranslation()
	const { setParams } = useFormDevtoolsStore()

	const columns: ColumnsType<any> = [
		{
			title: t("client"),
			dataIndex: ["client"],
			key: "client_info",
			render: (value?: SalesProduct["client"]) => {
				return (
					<Space>
						{formatEmpty(value?.full_name)}
						<Popover content={<ClientTable data={value} />}>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: t("payment_method"),
			dataIndex: ["sell", "payment_type", "name"],
			key: "payment_type",
			render: formatEmpty
		},
		{
			title: t("products"),
			key: "products",
			render: (_, record) => {
				const products = record?.sell?.products || []
				return (
					<Space>
						<Popover
							content={<SalesProductsTableList data={products} />}
						>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: t("transactions"),
			key: "transactions",
			render: (_, record) => {
				const transaction = record?.transaction || []
				return (
					<Space>
						<Popover
							content={<TransactionsTable data={transaction} />}
						>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: t("total_amount"),
			dataIndex: ["total_amount"],
			key: "total_amount",
			render: formatPriceUZS
		},
		{
			title: t("total_paid_amount"),
			dataIndex: ["total_paid_amount"],
			key: "total_paid_amount",
			render: formatPriceUZS
		},
		{
			title: t("owed_amount"),
			dataIndex: ["owed_amount"],
			key: "owed_amount",
			render: formatPriceUZS
		},
		{
			title: t("due_date"),
			dataIndex: "due_date",
			key: "due_date",
			render: (_, record) => <UseDebtorsColumnDueDatePicker record={record} />,
		},
		{
			title: t("created"),
			dataIndex: "created_at",
			key: "created_at",
			render: formateHHDate
		},
		{
			width: 100,
			fixed: "right",
			title: "",
			key: "actions",
			render: (_, record) => (
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => setParams(record)}
				/>
			),
		},

	]
	return columns
}
