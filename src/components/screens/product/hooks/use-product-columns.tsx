import { Divider, Space } from "antd"
import type { ColumnsType } from "antd/es/table"

import type { ProductTransactions } from "src/services/products"
import {
	formatDate,
	formatEmpty,
	formatPriceUSD,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useProductColumns = () => {
	const columns: ColumnsType<ProductTransactions> = [
		{
			title: "Длина",
			dataIndex: "meter",
			key: "meter"
		},
		{
			title: "Площад",
			dataIndex: "meter_square",
			key: "meter_square",
			render: formatEmpty
		},
		{
			title: "Количество роллов",
			dataIndex: "rolls",
			key: "rolls",
			render: formatEmpty
		},
		/* 	{
			align: "center",
			title: "Остаток площади",
			dataIndex: "remainder_square_meter",
			key: "remainder_square_meter",
			render: formatEmpty
		}, */
		{
			align: "center",
			title: "Цена",
			key: "price",
			render: (_v, record) => (
				<Space split={<Divider type={"vertical"} />}>
					{formatPriceUZS(record.price_uzs)}
					{formatPriceUSD(record.price_usd)}
				</Space>
			)
		},

		{
			title: "Создан",
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		}
	]

	return columns
}
