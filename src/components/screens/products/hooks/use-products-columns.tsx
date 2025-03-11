import { EyeFilled } from "@ant-design/icons"
import { useLocation, useRouter } from "@tanstack/react-router"
import { Divider, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import type { Product } from "src/services/products"
import {
	formatDate,
	formatEmpty,
	formatPriceUSD,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useProductsColumns = () => {
	const { history } = useRouter()
	const { pathname } = useLocation()

	const columns: ColumnsType<Product> = [
		{
			title: "Название",
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			align: "center",
			title: "Длина",
			dataIndex: "length",
			key: "length",
			render: formatEmpty
		},
		{
			align: "center",
			title: "Ширина",
			dataIndex: "width",
			key: "width",
			render: formatEmpty
		},
		{
			align: "center",
			title: "Площадь",
			dataIndex: "meter_square",
			key: "meter_square",
			render: formatEmpty
		},
		{
			align: "center",
			title: "Остаток площади",
			dataIndex: "remainder_square_meter",
			key: "remainder_square_meter",
			render: formatEmpty
		},
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
			title: "Поставщик",
			dataIndex: ["supplier", "name"],
			key: "supplier",
			render: formatEmpty
		},

		{
			title: "Создан",
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		},
		{
			fixed: "right",
			width: 50,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => history.push(`${pathname}/${record.id}`)}
						tooltip={"Открыть"}
						icon={<EyeFilled />}
					/>
				</Space>
			)
		}
	]

	return columns
}
