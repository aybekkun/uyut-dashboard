import type { Supplier } from "src/services/suppliers"
import type { PrintDetail } from "./print-details"

export type ProductItem = {
	id: number
	name: {
		id: number
		name: string
	}
	collar: {
		id: number
		name: string
	}
	total_length: number
	total_price_uzs: number
	total_price_usd: number
	total_meter_square: number | null
	total_meter: number
	total_rolls: number
	remainder: {
		meter_square: null | number
		meter: null | number
	}[]
	created_at: Date
	updated_at: Date
}

export type ProductResponse = {
	data: ProductItem
	transactions: ProductTransactions[]
	pagination: {
		count: number
		num_pages: number
	}
}
export type ProductTransactions = {
	id: number
	length: number
	meter_square: number
	meter: null
	rolls: 2
	price_uzs: string
	price_usd: string
	supplier: {
		id: number
		name: string
	}
	created_at: Date
	updated_at: Date
}

type Product = {
	id: number
	name: {
		id: number
		name: string
	}
	width: {
		id: number
		width: number
	} | null
	length: number
	meter_square: number | null
	remainder_square_meter: number
	price_uzs: string | number
	price_usd: string | number
	supplier: Supplier
	print_details: PrintDetail[]
	created_at: string
}

type ProductForm = {
	name_id: string
	collar_id: number | null
	price_uzs: string | number
	price_usd: string | number
	count: number | null
	rolls: number | null
	supplier_id: number
}

// type ProductForm = {
// 	name: string
// 	width: number
// 	length: number
// 	meter_square: number
// 	price_uzs: string | number
// 	price_usd: string | number
// 	supplier_id: number
// }

export type { Product, ProductForm }
