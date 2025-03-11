import type { PrintType } from "src/services/shared/print-types"

type PrintDetail = {
	id: number
	print_type: PrintType
	meter: number
	print_cost: string
	material_cost: string
}

type PrintDetailForm = {
	id?: number
	print_type_id: number
	meter: number
	print_cost: string
	material_cost: string
}

export type { PrintDetail, PrintDetailForm }
