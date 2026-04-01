import { createFileRoute } from "@tanstack/react-router"
import { Card, Col, Row, Spin, Typography, DatePicker } from "antd"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useGetMonthlyCashflowQuery } from "src/services/dashboard"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

const { Title } = Typography

export const Route = createFileRoute("/_layout/dashboard")({
	component: DashboardComponent
})

function DashboardComponent() {
	const { t } = useTranslation()
	const [date, setDate] = useState(dayjs())
	
	const year = date.year()
	const month = date.month() + 1

	const { data, isLoading } = useGetMonthlyCashflowQuery({ year, month })

	const chartData = useMemo(() => {
		if (!data?.data) return []
		return [
			{ name: t("dashboard.revenue"), value: data.data.total_revenue, color: "#52c41a" },
			{ name: t("dashboard.expenses"), value: data.data.total_expenses, color: "#f5222d" }
		]
	}, [data, t])

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "50px" }}>
				<Spin size="large" />
			</div>
		)
	}

	const dashboard = data?.data

	return (
		<div style={{ padding: "24px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
				<Title level={2} style={{ margin: 0 }}>{t("menu.dashboard")}</Title>
				<DatePicker 
					picker="month" 
					value={date} 
					onChange={(val) => val && setDate(val)} 
					allowClear={false}
					placeholder={t("dashboard.select_date")}
				/>
			</div>
			
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={8}>
					<Card title={t("dashboard.revenue")} bordered={false}>
						<Title level={3} style={{ color: "#52c41a", margin: 0 }}>
							{dashboard?.total_revenue?.toLocaleString()} 
						</Title>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card title={t("dashboard.expenses")} bordered={false}>
						<Title level={3} style={{ color: "#f5222d", margin: 0 }}>
							{dashboard?.total_expenses?.toLocaleString()}
						</Title>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card title={t("dashboard.net_profit")} bordered={false}>
						<Title level={3} style={{ color: "#1890ff", margin: 0 }}>
							{dashboard?.profit?.toLocaleString()}
						</Title>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
				<Col span={24}>
					<Card title={t("dashboard.distribution")}>
						<div style={{ height: "400px", width: "100%" }}>
							<ResponsiveContainer>
								<PieChart>
									<Pie
										data={chartData}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={120}
										fill="#8884d8"
										dataKey="value"
										label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
