export type ProductMonthlyReportParams = {
	year?: number
	month?: number
}

export type ProductMonthlyReportData = {
	product: {
		id: number
		width: number | null
		name: {
			id: number
			name: string
			is_collar: boolean
		}
		collar: {
			id: number
			collar: string
		} | null
		measurement_unit: {
			id: number
			name: string
		}
		total_length: number
		total_price_uzs: number
		total_price_usd: number
		total_meter_square: number | null
		total_meter: number | null
		total_rolls: number
		sell_price: string
		remainder: {
			meter_square: number | null
			meter: number | null
			pieces: number | null
		}
		created_at: string
		updated_at: string
	}
	unit: "meter" | "m2" | "pieces" | string
	sold_quantity: number
	total_revenue: number
	total_cost: number
	profit: number
	current_stock: number
}
