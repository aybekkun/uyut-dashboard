import { EyeFilled } from "@ant-design/icons"
import { useLocation, useRouter } from "@tanstack/react-router"
import { Divider, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
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
	const { t } = useTranslation()
	const columns: ColumnsType<ProductItem> = [
		{
			title: t("name"),
			dataIndex: ["name", "name"],
			key: "name"
		},
		{
			title: t("color"),
			dataIndex: ["collar", "collar"],
			key: "collar"
		},

		{
			align: "center",
			title: t("price"),
			key: "price",
			render: (_v, record) => (
				<Space split={<Divider type={"vertical"} />}>
					{formatPriceUZS(record.total_price_uzs)}
					{formatPriceUSD(record.total_price_usd)}
				</Space>
			)
		},
		{
			title: "Цена продажи",
			dataIndex: "sell_price",
			key: "sell_price",
			render: (_v, record) => (
				<Space split={<Divider type={"vertical"} />}>
					{formatPriceUZS(record.sell_price)}
				</Space>
			)
		},
		{
			title: t("total_length"),
			dataIndex: "total_meter",
			key: "total_meter",
			render: formatEmpty
		},
		{
			align: "center",
			title: t("total_area"),
			dataIndex: "total_meter_square",
			key: "total_meter_square"
		},

		{
			title: t("remainder_length"),
			dataIndex: ["remainder", "meter"],
			key: "total_meter",
			render: formatEmpty
		},
		{
			align: "center",
			title: t("remainder_area"),
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
