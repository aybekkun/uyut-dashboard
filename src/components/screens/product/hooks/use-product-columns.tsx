import { Divider, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"

import type { ProductTransactions } from "src/services/products"
import {
	formateHHDate,
	formatEmpty,
	formatPriceUSD,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useProductColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<ProductTransactions> = [
		{
			title: t("length"),
			dataIndex: "meter",
			key: "meter"
		},
		{
			title: t("area"),
			dataIndex: "meter_square",
			key: "meter_square",
			render: formatEmpty
		},
		{
			title: t("number_of_rolls"),
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
			title: t("price"),
			key: "price",
			render: (_v, record) => (
				<Space split={<Divider type={"vertical"} />}>
					{formatPriceUZS(record.price_uzs)}
					{formatPriceUSD(record.price_usd)}
				</Space>
			)
		},

		{
			title: t("created"),
			dataIndex: "imported_at",
			key: "imported_at",
			render: formateHHDate
		}
	]

	return columns
}
