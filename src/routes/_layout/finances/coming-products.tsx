import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"
import {
	FinancesByDateChart,
	FinancesByTodayStatistic
} from "src/components/screens/finances"

export const Route = createFileRoute("/_layout/finances/coming-products")({
	component: ComingProductsComponent
})

function ComingProductsComponent() {
	return (
		<>
			<FinancesByTodayStatistic url={"products"} />
			<Row gutter={20} style={{ rowGap: 20 }}>
				<Col xs={24} md={8}>
					<FinancesByDateChart
						title={"Приходы по годам"}
						url={"products"}
						type={"year"}
					/>
				</Col>
				<Col xs={24} md={16}>
					<FinancesByDateChart
						title={"Приходы по месяцам"}
						url={"products"}
						type={"month"}
					/>
				</Col>
				<Col span={24}>
					<FinancesByDateChart
						title={"Приходы по дням"}
						url={"products"}
						type={"days"}
					/>
				</Col>
			</Row>
		</>
	)
}
