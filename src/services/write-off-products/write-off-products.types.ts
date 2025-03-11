import { Dayjs } from "dayjs"
import type { Product } from "../products"

type WriteOffProduct = {
	id: number
	product: Product
	date: string
	name: string
	length: number
	amount: string | number
	meter_square: number
	created_at: string
	updated_at: string
}

type WriteOffProductForm = {
	id?: number
	product_id: number
	date: string | Dayjs
	name: string
	length: number
	amount: string | number
}

export type { WriteOffProduct, WriteOffProductForm }
