import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"
import {
	FinancesByDateChart,
	FinancesByTodayStatistic
} from "src/components/screens/finances"

export const Route = createFileRoute("/_layout/finances/expenses")({
	component: ExpensesComponent
})

function ExpensesComponent() {
	return (
		<>
			<FinancesByTodayStatistic onlyUZS={true} url={"expenses"} />
			<Row gutter={20} style={{ rowGap: 20 }}>
				<Col xs={24} md={8}>
					<FinancesByDateChart
						onlyUZS={true}
						title={"Расходы по годам"}
						url={"expenses"}
						type={"year"}
					/>
				</Col>
				<Col xs={24} md={16}>
					<FinancesByDateChart
						onlyUZS={true}
						title={"Расходы по месяцам"}
						url={"expenses"}
						type={"month"}
					/>
				</Col>
				<Col span={24}>
					<FinancesByDateChart
						onlyUZS={true}
						title={"Расходы по дням"}
						url={"expenses"}
						type={"days"}
					/>
				</Col>
			</Row>
		</>
	)
}
