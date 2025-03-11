import {
	DollarOutlined,
	DownOutlined,
	ShoppingCartOutlined
} from "@ant-design/icons"
import {
	Card,
	Col,
	Dropdown,
	Flex,
	Row,
	Skeleton,
	Space,
	theme,
	Typography
} from "antd"
import { type FC, useState } from "react"
import { financePriceTypesData } from "src/constants/data.constants"
import {
	FinancePriceType,
	FinanceUrl,
	useGetFinancesByTodayQuery
} from "src/services/finances"
import { formatEmpty, formatPrice } from "src/utils/formatter.utils"

interface FinancesByTodayStatisticProps {
	url: FinanceUrl
	onlyUZS?: boolean
}

const FinancesByTodayStatistic: FC<FinancesByTodayStatisticProps> = ({
	url,
	onlyUZS
}) => {
	const [priceType, setPriceType] = useState<FinancePriceType>("uzs")

	const { data: financesByToday, isLoading } = useGetFinancesByTodayQuery(url, {
		price_type: priceType
	})

	const data = [
		{
			title: "Общая сумма",
			Icon: DollarOutlined,
			value: isLoading ? (
				<Skeleton.Input style={{ height: 20 }} />
			) : (
				<Space>
					{formatPrice(financesByToday?.data?.total_amount)}
					{onlyUZS ? (
						priceType.toUpperCase()
					) : (
						<Dropdown
							menu={{
								selectedKeys: [priceType],
								onClick: (el) => setPriceType(el.key as FinancePriceType),
								items: financePriceTypesData.map((el) => ({
									key: el.value,
									label: el.label
								}))
							}}>
							<Space align={"center"} style={{ cursor: "pointer" }}>
								{priceType.toUpperCase()}
								<DownOutlined style={{ fontSize: 16 }} />
							</Space>
						</Dropdown>
					)}
				</Space>
			)
		},
		{
			title: "Общее количество",
			Icon: ShoppingCartOutlined,
			value: isLoading ? (
				<Skeleton.Input style={{ height: 20 }} />
			) : (
				formatEmpty(financesByToday?.data?.total_count)
			)
		}
	]

	const { token } = theme.useToken()

	return (
		<Row gutter={20} style={{ rowGap: 20 }}>
			{data.map(({ Icon, value, title }, index) => (
				<Col xs={24} sm={12} key={index}>
					<Card bordered={false}>
						<Flex justify={"space-between"}>
							<Space direction={"vertical"}>
								<Typography.Title level={4}>{value}</Typography.Title>
								<Typography.Text>{title}</Typography.Text>
							</Space>
							<Flex
								style={{
									backgroundColor: token.colorPrimaryBg,
									borderRadius: 9999,
									aspectRatio: 1,
									padding: token.padding,
									color: token.colorPrimary
								}}>
								<Icon
									style={{
										fontSize: token.fontSizeHeading3
									}}
								/>
							</Flex>
						</Flex>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export { FinancesByTodayStatistic }
