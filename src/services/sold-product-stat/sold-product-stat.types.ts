import { GetParams } from "src/services/shared"

export interface SoldProduct {
	id: number
	width: number | null
	name: {
		id: number
		name: string
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

export interface SoldProductStat {
	product: SoldProduct
	total_value: number
	unit: string
	total_amount: string
}

export interface SoldProductStatParams extends GetParams {
	from_date?: string
	to_date?: string
}
