import { ColumnsType } from "antd/es/table"
import { type FC } from "react"
import { Table } from "src/components/ui/table"
import { Product } from "src/services/products"
import { formatEmpty, formatPrice } from "src/utils/formatter.utils"

interface ProductMiniTableProps {
	data?: Product
}

const columns: ColumnsType<Product> = [
	{
		title: "Название",
		dataIndex: "name",
		key: "name",
		render: formatEmpty
	},
	{
		title: "Размер",
		key: "size",
		children: [
			{
				title: "Длина",
				dataIndex: "length",
				key: "length",
				render: formatEmpty
			},
			{
				title: "Ширина",
				dataIndex: "width",
				key: "width",
				render: formatEmpty
			},
			{
				title: "Площадь",
				dataIndex: "meter_square",
				key: "meter_square",
				render: formatEmpty
			}
		]
	},
	{
		title: "Цена",
		key: "price",
		children: [
			{
				title: "UZS",
				dataIndex: "price_uzs",
				key: "price_uzs",
				render: formatPrice
			},
			{
				title: "USD",
				dataIndex: "price_usd",
				key: "price_usd",
				render: formatPrice
			}
		]
	}
]

const ProductMiniTable: FC<ProductMiniTableProps> = ({ data }) => {
	return (
		<>
			<Table<Product>
				title={data && data?.name ? data.name : "Товар"}
				columns={columns}
				dataSource={data ? [data] : []}
				pagination={false}
			/>
		</>
	)
}

export { ProductMiniTable }
