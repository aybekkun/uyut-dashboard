import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"
import { useTranslation } from "react-i18next"
import {
	FinancesByDateChart,
	FinancesByTodayStatistic
} from "src/components/screens/finances"

export const Route = createFileRoute("/_layout/finances/expenses")({
	component: ExpensesComponent
})

function ExpensesComponent() {
	const { t } = useTranslation()
	return (
		<>
			<FinancesByTodayStatistic onlyUZS={true} url={"expenses"} />
			<Row gutter={20} style={{ rowGap: 20 }}>
				<Col xs={24} md={8}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("expenses_by_years")}
						url={"expenses"}
						type={"year"}
					/>
				</Col>
				<Col xs={24} md={16}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("expenses_by_months")}
						url={"expenses"}
						type={"month"}
					/>
				</Col>
				<Col span={24}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("expenses_by_days")}
						url={"expenses"}
						type={"days"}
					/>
				</Col>
			</Row>
		</>
	)
}
