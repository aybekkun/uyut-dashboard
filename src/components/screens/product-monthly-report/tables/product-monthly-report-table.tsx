import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Table } from "src/components/ui/table"
import {
	type ProductMonthlyReportData,
	type ProductMonthlyReportParams,
	useGetProductMonthlyReportQuery
} from "src/services/product-monthly-report"
import { useProductMonthlyReportColumns } from "../hooks/use-product-monthly-report-columns"

interface ProductMonthlyReportTableProps {
	params: ProductMonthlyReportParams
	onChangeParams: (params: ProductMonthlyReportParams) => void
}

const ProductMonthlyReportTable: FC<ProductMonthlyReportTableProps> = ({
	params,
	onChangeParams
}) => {
	const { t } = useTranslation()
	const {
		data: stats,
		isLoading,
		isFetching
	} = useGetProductMonthlyReportQuery({
		year: params.year || dayjs().year(),
		month: params.month || dayjs().month() + 1
	})

	const columns = useProductMonthlyReportColumns()

	const onDateChange = (date: dayjs.Dayjs | null) => {
		if (date) {
			onChangeParams({
				year: date.year(),
				month: date.month() + 1
			})
		} else {
			onChangeParams({
				year: undefined,
				month: undefined
			})
		}
	}

	return (
		<Table<ProductMonthlyReportData>
			rowKey={(record) => record.product.id}
			title={t("menu.sales_product_monthly_report")}
			extra={
				<Space>
					<DatePicker
						picker="month"
						value={
							params.year && params.month
								? dayjs(`${params.year}-${params.month}-01`)
								: dayjs()
						}
						onChange={onDateChange}
						allowClear={false}
					/>
				</Space>
			}
			columns={columns}
			dataSource={stats?.data}
			loading={isLoading || isFetching}
			pagination={false}
		/>
	)
}

export { ProductMonthlyReportTable }
