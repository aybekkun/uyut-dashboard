export type PrintMonthlyReportParams = {
	year?: number
	month?: number
}

export type PrintMonthlyReportData = {
	print_type_id: number
	print_type_name: string
	total_meter_square: number
	total_meter: number
	total_pieces: number
	total_revenue: number
	total_cost: number
	profit: number
}
