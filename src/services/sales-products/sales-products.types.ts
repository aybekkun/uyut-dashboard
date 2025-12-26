import type { Client } from "src/services/shared/clients"
import type { PaymentType } from "src/services/shared/payment-types"
import { MeasurementUnits } from "../shared/measurement-units"

type SalesProduct = {
	id: number
	total_cost: string
	total_meter_square: number
	total_meter: number
	payment_type: PaymentType
	client: Client
	products: SalesProductsItems[]
	created_at: string
	updated_at?: string
}

export type SalesProductsItems = {
	id: number
	product: {
		id: number
		name: string
		measurement_unit: MeasurementUnits
	}
	print_type: {
		id: number
		name: string
		amount: string
	}
	print_cost: string
	material_cost: string
	amount: string
	meter_square: number
	length: number
	pieces: number
	print_meter_square: number
	meter: number
	file: null
}

type SalesProductForm = {
	payment_type_id: number
	full_name: string
	phone: string
	paid_amount?: number
	due_date?: string
	products: {
		product_id: number
		print_type_id?: number
		print_cost?: number
		material_cost?: number
		length?: number
		pieces?: number
		print_meter_square?: number
		full_cost?: number
	}[]
}

export type { SalesProduct, SalesProductForm }
