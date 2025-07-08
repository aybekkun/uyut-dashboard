import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"
import { useTranslation } from "react-i18next"
import {
	FinancesByDateChart,
	FinancesByTodayStatistic
} from "src/components/screens/finances"

export const Route = createFileRoute("/_layout/finances/coming-products")({
	component: ComingProductsComponent
})

function ComingProductsComponent() {
	const { t } = useTranslation()
	return (
		<>
			<FinancesByTodayStatistic url={"products"} />
			<Row gutter={20} style={{ rowGap: 20 }}>
				<Col xs={24} md={8}>
					<FinancesByDateChart
						title={t("income_by_years")}
						url={"products"}
						type={"year"}
					/>
				</Col>
				<Col xs={24} md={16}>
					<FinancesByDateChart
						title={t("income_by_months")}
						url={"products"}
						type={"month"}
					/>
				</Col>
				<Col span={24}>
					<FinancesByDateChart
						title={t("income_by_days")}
						url={"products"}
						type={"days"}
					/>
				</Col>
			</Row>
		</>
	)
}
