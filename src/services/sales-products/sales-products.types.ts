import type { Client } from "src/services/shared/clients"
import type { PaymentType } from "src/services/shared/payment-types"

type SalesProduct = {
	id: number
	total_cost: string
	total_meter_square: number
	total_meter: number
	payment_type: PaymentType
	client: Client
	products: SalesProductsItems
	created_at: string
	updated_at: string
}

export type SalesProductsItems = {
	id: number
	product: {
		id: number
		name: string
	}
	print_type: {
		id: number
		name: string
	}
	print_cost: string
	material_cost: string
	amount: string
	meter_square: number
	meter: number
	file: null
}

type SalesProductForm = {
	payment_type_id: number
	full_name: string
	phone: string
	products: [
		{
			product_id: number
			print_type_id: number
			print_cost: number
			material_cost: number
			length: number
		}
	]
}

export type { SalesProduct, SalesProductForm }
