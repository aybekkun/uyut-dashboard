import { DeleteFilled, QuestionCircleOutlined } from "@ant-design/icons"
import { Popover, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { ClientTable } from "src/components/shared/client"

import { Button } from "src/components/ui/button"
import {
	type SalesProduct,
	useDeleteSalesProductsMutation
} from "src/services/sales-products"

import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"
import { SalesProductsTableList } from "../tables/sales-products-table-list"
import { useTranslation } from "react-i18next"
import { useGetProfileQuery } from "src/services/login"

export const useSalesProductsColumns = () => {
	const { mutate: deleteSalesProduct } = useDeleteSalesProductsMutation()
	const { data: profile } = useGetProfileQuery()
	const { t } = useTranslation()
	const columns: ColumnsType<SalesProduct> = [
		{
			title: t("total_area"),
			dataIndex: "total_meter_square",
			key: "total_meter_square",
			render: formatEmpty
		},
		{
			title: t("total_length"),
			dataIndex: "total_meter",
			key: "total_meter",
			render: formatEmpty
		},
		{
			title: t("total_cost"),
			dataIndex: "total_cost",
			key: "total_cost",
			render: formatPriceUZS
		},
		{
			title: t("payment_method"),
			dataIndex: ["payment_type", "name"],
			key: "payment_type",
			render: formatEmpty
		},
		{
			title: t("products"),
			key: "products",
			dataIndex: "products",
			render: (value?: SalesProduct["products"][]) => {
				return (
					<Space>
						<Popover content={<SalesProductsTableList data={value || []} />}>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: t("client"),
			dataIndex: ["client"],
			key: "client",
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
			title: t("created"),
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		},
		{
			width: 100,
			fixed: "right",
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					{profile?.data.role.name === "direktor" && (
						<Button
							confirm={{
								title: t("delete_confirm"),
								onConfirm: () => deleteSalesProduct(record?.id)
							}}
							tooltip={t("delete")}
							danger={true}
							icon={<DeleteFilled />}
						/>
					)}
				</Space>
			)
		}
	]

	return columns
}
