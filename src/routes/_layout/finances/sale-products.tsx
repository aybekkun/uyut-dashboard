import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"
import { useTranslation } from "react-i18next"
import {
	FinancesByDateChart,
	FinancesByTodayStatistic
} from "src/components/screens/finances"

export const Route = createFileRoute("/_layout/finances/sale-products")({
	component: SaleProductsComponent
})

function SaleProductsComponent() {
	const { t } = useTranslation()
	return (
		<>
			<FinancesByTodayStatistic onlyUZS={true} url={"sales-products"} />
			<Row gutter={20} style={{ rowGap: 20 }}>
				<Col xs={24} md={8}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("sales_by_years")}
						url={"sales-products"}
						type={"year"}
					/>
				</Col>
				<Col xs={24} md={16}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("sales_by_months")}
						url={"sales-products"}
						type={"month"}
					/>
				</Col>
				<Col span={24}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("sales_by_days")}
						url={"sales-products"}
						type={"days"}
					/>
				</Col>
			</Row>
		</>
	)
}
