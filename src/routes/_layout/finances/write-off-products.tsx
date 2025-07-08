import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"
import { useTranslation } from "react-i18next"
import {
	FinancesByDateChart,
	FinancesByTodayStatistic
} from "src/components/screens/finances"

export const Route = createFileRoute("/_layout/finances/write-off-products")({
	component: WriteOffProductsComponent
})

function WriteOffProductsComponent() {
	const { t } = useTranslation()

	return (
		<>
			<FinancesByTodayStatistic onlyUZS={true} url={"write-off-reports"} />
			<Row gutter={20} style={{ rowGap: 20 }}>
				<Col xs={24} md={8}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("write_off_by_years")}
						url={"write-off-reports"}
						type={"year"}
					/>
				</Col>
				<Col xs={24} md={16}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("write_off_by_months")}
						url={"write-off-reports"}
						type={"month"}
					/>
				</Col>
				<Col span={24}>
					<FinancesByDateChart
						onlyUZS={true}
						title={t("write_off_by_days")}
						url={"write-off-reports"}
						type={"days"}
					/>
				</Col>
			</Row>
		</>
	)
}
