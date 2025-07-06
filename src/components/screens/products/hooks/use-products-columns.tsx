import { EyeFilled } from "@ant-design/icons"
import { useLocation, useRouter } from "@tanstack/react-router"
import { Divider, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import type { ProductItem } from "src/services/products"
import {
	formatEmpty,
	formatPriceUSD,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useProductsColumns = () => {
	const { history } = useRouter()
	const { pathname } = useLocation()

	const columns: ColumnsType<ProductItem> = [
		{
			title: "Название",
			dataIndex: ["name", "name"],
			key: "name"
		},
		{
			title: "Цвет",
			dataIndex: ["collar", "collar"],
			key: "collar"
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
					{formatPriceUZS(record.total_price_uzs)}
					{formatPriceUSD(record.total_price_usd)}
				</Space>
			)
		},

		{
			title: "Общая длина",
			dataIndex: "total_meter",
			key: "total_meter",
			render: formatEmpty
		},
		{
			align: "center",
			title: "Общая Площадь",
			dataIndex: "total_meter_square",
			key: "total_meter_square"
		},

		{
			title: "Остаток длина",
			dataIndex: ["remainder", "meter"],
			key: "total_meter",
			render: formatEmpty
		},
		{
			align: "center",
			title: "Остаток Площадь",
			dataIndex: ["remainder", "meter_square"],
			key: "total_meter_square",
			render: formatEmpty
		},
	/* 	{
			title: "Создан",
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		}, */
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
