import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"
import {
	FinancesByDateChart,
	FinancesByTodayStatistic
} from "src/components/screens/finances"

export const Route = createFileRoute("/_layout/finances/write-off-products")({
	component: WriteOffProductsComponent
})

function WriteOffProductsComponent() {
	return (
		<>
			<FinancesByTodayStatistic onlyUZS={true} url={"write-off-reports"} />
			<Row gutter={20} style={{ rowGap: 20 }}>
				<Col xs={24} md={8}>
					<FinancesByDateChart
						onlyUZS={true}
						title={"Списания по годам"}
						url={"write-off-reports"}
						type={"year"}
					/>
				</Col>
				<Col xs={24} md={16}>
					<FinancesByDateChart
						onlyUZS={true}
						title={"Списания по месяцам"}
						url={"write-off-reports"}
						type={"month"}
					/>
				</Col>
				<Col span={24}>
					<FinancesByDateChart
						onlyUZS={true}
						title={"Списания по дням"}
						url={"write-off-reports"}
						type={"days"}
					/>
				</Col>
			</Row>
		</>
	)
}
