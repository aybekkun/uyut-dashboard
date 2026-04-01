import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Table } from "src/components/ui/table"
import {
	type PrintMonthlyReportData,
	type PrintMonthlyReportParams,
	useGetPrintMonthlyReportQuery
} from "src/services/print-monthly-report"
import { usePrintMonthlyReportColumns } from "../hooks/use-print-monthly-report-columns"

interface PrintMonthlyReportTableProps {
	params: PrintMonthlyReportParams
	onChangeParams: (params: PrintMonthlyReportParams) => void
}

const PrintMonthlyReportTable: FC<PrintMonthlyReportTableProps> = ({
	params,
	onChangeParams
}) => {
	const { t } = useTranslation()
	const {
		data: stats,
		isLoading,
		isFetching
	} = useGetPrintMonthlyReportQuery({
		year: params.year || dayjs().year(),
		month: params.month || dayjs().month() + 1
	})

	const columns = usePrintMonthlyReportColumns()

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
		<Table<PrintMonthlyReportData>
			rowKey={(record) => record.print_type_id}
			title={t("menu.sales_print_monthly_report")}
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

export { PrintMonthlyReportTable }
