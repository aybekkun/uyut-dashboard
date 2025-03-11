import { SettingFilled } from "@ant-design/icons"
import { Card, Popover, Segmented, Space, Spin } from "antd"
import dayjs from "dayjs"
import EChartsReact from "echarts-for-react"
import { type FC, useState } from "react"
import { useFinancesByDateOption } from "src/components/screens/finances/hooks/use-finances-by-date-option"
import { Button } from "src/components/ui/button"
import { DatePicker } from "src/components/ui/date-picker"
import {
	financePriceTypesData,
	financeTypesData
} from "src/constants/data.constants"
import {
	FinanceDate,
	type FinancePriceType,
	type FinanceType,
	type FinanceUrl,
	useGetFinancesByDateQuery
} from "src/services/finances"

interface FinancesByDateChartProps {
	title: string
	url: FinanceUrl
	type: FinanceDate
	onlyUZS?: boolean
}

const FinancesByDateChart: FC<FinancesByDateChartProps> = ({
	title,
	url,
	type,
	onlyUZS
}) => {
	const [date, setDate] = useState(dayjs())
	const [valueType, setValueType] = useState<FinanceType>("amount")
	const [priceType, setPriceType] = useState<FinancePriceType>("uzs")

	const {
		data: comingProductsByYear,
		isLoading,
		isFetching
	} = useGetFinancesByDateQuery(url, type, {
		type: valueType,
		year: date.format("YYYY"),
		month: date.format("M"),
		price_type: priceType
	})

	const option = useFinancesByDateOption({
		type,
		valueType,
		priceType,
		data: comingProductsByYear?.data
	})
	return (
		<Card
			bordered={false}
			title={title}
			extra={
				<Space>
					<DatePicker
						picker={type === "days" ? "month" : "year"}
						format={{
							format: type === "days" ? "MM.YYYY" : "YYYY",
							type: "mask"
						}}
						onToday={() => setDate(dayjs())}
						value={date}
						allowClear={false}
						onChange={setDate}
					/>
					<Popover
						placement={"bottomRight"}
						trigger={"click"}
						content={
							<Space direction={"vertical"}>
								<Segmented<FinanceType>
									onChange={setValueType}
									options={financeTypesData}
								/>
								<Segmented<FinancePriceType>
									hidden={valueType === "count" || onlyUZS}
									block={true}
									value={priceType}
									onChange={setPriceType}
									options={financePriceTypesData}
								/>
							</Space>
						}>
						<Button tooltip={"Фильтры"} icon={<SettingFilled />} />
					</Popover>
				</Space>
			}>
			<Spin spinning={isLoading || isFetching}>
				<EChartsReact option={option} />
			</Spin>
		</Card>
	)
}

export { FinancesByDateChart }
