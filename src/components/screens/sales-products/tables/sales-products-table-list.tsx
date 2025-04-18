import Table, { ColumnsType } from "antd/es/table"
import { FC } from "react"

import { type SalesProduct } from "src/services/sales-products"
import { formatEmpty, formatInputPrice } from "src/utils/formatter.utils"

interface SalesProductsTableListProps {
	data: SalesProduct["products"][]
}
const columns: ColumnsType<SalesProduct["products"]> = [
	{
		title: "Название",
		dataIndex: ["product", "name"],
		key: "name",
		render: formatEmpty
	},
	{
		title: "Принт тип",
		dataIndex: ["print_type", "name"],
		key: "print_type",
		render: formatEmpty
	},
	{
		title: "Цена принта",
		dataIndex: "print_cost",
		key: "print_cost",
		render: formatInputPrice
	},
	{
		title: "Цена материала",
		dataIndex: "material_cost",
		key: "material_cost",
		render: formatInputPrice
	},
	{
		title: "Площадь",
		dataIndex: "meter_square",
		key: "meter_square",
		render: formatEmpty
	},
	{
		title: "Длина",
		dataIndex: "meter",
		key: "meter",
		render: formatEmpty
	},

	{
		title: "Польная стоимость",
		dataIndex: "amount",
		key: "amount",
		render: formatInputPrice
	}
]
const SalesProductsTableList: FC<SalesProductsTableListProps> = ({
	data = []
}) => {
	return (
		<>
			<Table<SalesProduct["products"]>
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
		</>
	)
}

export { SalesProductsTableList }
