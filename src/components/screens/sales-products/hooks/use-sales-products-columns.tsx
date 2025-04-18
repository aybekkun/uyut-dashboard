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

export const useSalesProductsColumns = () => {
	const { mutate: deleteSalesProduct } = useDeleteSalesProductsMutation()

	const columns: ColumnsType<SalesProduct> = [
		{
			title: "Общая площадь",
			dataIndex: "total_meter_square",
			key: "total_meter_square",
			render: formatEmpty
		},
		{
			title: "Общая Длина",
			dataIndex: "total_meter",
			key: "total_meter",
			render: formatEmpty
		},
		{
			title: "Общая стоимость",
			dataIndex: "total_cost",
			key: "total_cost",
			render: formatPriceUZS
		},
		{
			title: "Способ оплаты",
			dataIndex: ["payment_type", "name"],
			key: "payment_type",
			render: formatEmpty
		},
		{
			title: "Товары",
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
			title: "Клиент",
			dataIndex: ["client"],
			key: "client",
			// render: formatEmpty
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
			title: "Создано",
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
					{/* 	<Button
						onClick={() => editSalesProduct(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/> */}
					<Button
						confirm={{
							title: "Вы действительно хотите удалить?",
							onConfirm: () => deleteSalesProduct(record?.id)
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
