import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { PrintMonthlyReportData } from "src/services/print-monthly-report"
import { formatEmpty, formatPriceUZS } from "src/utils/formatter.utils"

export const usePrintMonthlyReportColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<PrintMonthlyReportData> = [
		{
			title: t("print_type"),
			dataIndex: "print_type_name",
			key: "print_type_name",
			render: formatEmpty
		},
		{
			title: t("meter_square"),
			dataIndex: "total_meter_square",
			key: "total_meter_square",
			render: formatEmpty
		},
		{
			title: t("meter"),
			dataIndex: "total_meter",
			key: "total_meter",
			render: formatEmpty
		},
		{
			title: t("pieces"),
			dataIndex: "total_pieces",
			key: "total_pieces",
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
		}
	]

	return columns
}
