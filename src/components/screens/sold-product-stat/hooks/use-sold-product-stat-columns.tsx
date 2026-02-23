import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { SoldProductStat } from "src/services/sold-product-stat"
import { formatEmpty, formatPriceUZS } from "src/utils/formatter.utils"

export const useSoldProductStatColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<SoldProductStat> = [
		{
			title: t("product"),
			key: "product",
			render: (_, record) => {
				const name = record.product?.name?.name || ""
				const collar = record.product?.collar?.collar
					? ` (${record.product.collar.collar})`
					: ""
				const width = record.product?.width ? ` - ${record.product.width}` : ""
				return `${name}${width}${collar}`
			}
		},
		{
			title: t("total_value"),
			dataIndex: "total_value",
			key: "total_value",
			render: formatEmpty
		},
		{
			title: t("unit"),
			dataIndex: "unit",
			key: "unit",
			render: (value) => t(value) || value
		},
		{
			title: t("total_amount"),
			dataIndex: "total_amount",
			key: "total_amount",
			render: formatPriceUZS
		}
	]

	return columns
}
