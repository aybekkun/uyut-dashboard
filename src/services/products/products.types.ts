import type { Supplier } from "src/services/suppliers"
import type { PrintDetail } from "./print-details"

type Product = {
	id: number
	name: string
	width: number
	length: number
	meter_square: number
	remainder_square_meter: number
	price_uzs: string | number
	price_usd: string | number
	supplier: Supplier
	print_details: PrintDetail[]
	created_at: string
}

type ProductForm = {
	name: string
	width: number
	length: number
	meter_square: number
	price_uzs: string | number
	price_usd: string | number
	supplier_id: number
}

export type { Product, ProductForm }
