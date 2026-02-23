import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Table } from "src/components/ui/table"
import {
	type SoldProductStat,
	type SoldProductStatParams,
	useGetSoldProductStatQuery
} from "src/services/sold-product-stat"
import { useSoldProductStatColumns } from "../hooks/use-sold-product-stat-columns"

const { RangePicker } = DatePicker

interface SoldProductStatTableProps {
	params: SoldProductStatParams
	onChangeParams: (params: SoldProductStatParams) => void
}

const SoldProductStatTable: FC<SoldProductStatTableProps> = ({
	params,
	onChangeParams
}) => {
	const { t } = useTranslation()
	const {
		data: stats,
		isLoading,
		isFetching
	} = useGetSoldProductStatQuery(params)

	const columns = useSoldProductStatColumns()

	const onDateChange = (
		dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
	) => {
		if (dates) {
			onChangeParams({
				...params,
				from_date: dates[0]?.format("YYYY-MM-DD"),
				to_date: dates[1]?.format("YYYY-MM-DD")
			})
		} else {
			onChangeParams({
				...params,
				from_date: undefined,
				to_date: undefined
			})
		}
	}

	return (
		<Table<SoldProductStat>
			rowKey={(record) => record.product.id}
			title={t("sold_product_stat")}
			extra={
				<Space>
					<RangePicker
						value={[
							params.from_date ? dayjs(params.from_date) : null,
							params.to_date ? dayjs(params.to_date) : null
						]}
						onChange={onDateChange}
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

export { SoldProductStatTable }
