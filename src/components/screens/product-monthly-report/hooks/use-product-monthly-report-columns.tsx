import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { ProductMonthlyReportData } from "src/services/product-monthly-report"
import { formatEmpty, formatPriceUZS } from "src/utils/formatter.utils"

export const useProductMonthlyReportColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<ProductMonthlyReportData> = [
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
			title: t("unit"),
			dataIndex: "unit",
			key: "unit",
			render: (value) => t(value) || value
		},
		{
			title: t("sold_quantity"),
			dataIndex: "sold_quantity",
			key: "sold_quantity",
			render: formatEmpty
		},
		{
			title: t("total_revenue"),
			dataIndex: "total_revenue",
			key: "total_revenue",
			render: formatPriceUZS
		},
		{
			title: t("total_cost"),
			dataIndex: "total_cost",
			key: "total_cost",
			render: formatPriceUZS
		},
		{
			title: t("profit"),
			dataIndex: "profit",
			key: "profit",
			render: formatPriceUZS
		},
		{
			title: t("current_stock"),
			dataIndex: "current_stock",
			key: "current_stock",
			render: formatEmpty
		}
	]

	return columns
}
