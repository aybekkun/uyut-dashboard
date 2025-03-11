import { theme } from "antd"
import capitalize from "antd/es/_util/capitalize"
import dayjs from "dayjs"
import { EChartsOption } from "echarts"
import {
	financePriceTypesData,
	financeTypesData
} from "src/constants/data.constants"
import {
	FinanceByDate,
	FinanceDate,
	FinancePriceType,
	FinanceType
} from "src/services/finances"
import { formatPrice } from "src/utils/formatter.utils"

interface ComingProductsByYearOptionProps {
	data?: FinanceByDate[]
	type?: FinanceDate
	valueType?: FinanceType
	priceType?: FinancePriceType
}

const useFinancesByDateOption = ({
	data,
	type,
	valueType,
	priceType
}: ComingProductsByYearOptionProps) => {
	const { token } = theme.useToken()

	const localeData = dayjs().localeData()
	const months = localeData.months()

	const barWidth = type === "year" ? "50%" : type === "month" ? "60%" : "70%"

	const title =
		financeTypesData.find((el) => el.value === valueType)?.label ||
		"Общая сумма"
	const currency =
		valueType === "amount"
			? financePriceTypesData.find((el) => el.value === priceType)?.label || ""
			: ""

	const categories =
		data?.map((el) =>
			type === "month" ? capitalize(months[Number(el.date) - 1]) : el.date
		) || []

	const seriesData: EChartsOption["series"] = {
		name: title,
		type: "bar",
		barWidth,
		itemStyle: {
			borderRadius: [token.borderRadius, token.borderRadius, 0, 0]
		},
		label: {
			show: type === "year",
			formatter: (params) => `${formatPrice(params.value)} ${currency}`,
			position: "inside",
			color: token.colorTextLightSolid,
			fontSize: token.fontSize
		},
		data: data?.map((el) => el.total) || []
	}

	const option: EChartsOption = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			},
			backgroundColor: token.colorBgContainer,
			borderColor: token.colorBorder,
			textStyle: {
				color: token.colorText
			},
			valueFormatter: (value) => `${formatPrice(value)} ${currency}`
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			top: "3%",
			containLabel: true
		},
		xAxis: {
			type: "category",
			data: categories,
			axisTick: {
				alignWithLabel: true
			},
			axisLabel: {
				color: token.colorTextTertiary
			}
		},
		yAxis: {
			type: "value",
			axisLabel: {
				color: token.colorTextTertiary,
				formatter: formatPrice
			},
			splitLine: {
				lineStyle: {
					color: token.colorBorder
				}
			}
		},
		series: seriesData
	}
	return option
}

export { useFinancesByDateOption }
