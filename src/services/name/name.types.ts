type ProductsName = {
	id: number
	name: string
	is_collar: boolean
}

type ProductsNameForm = {
	id?: number
	name: string
	is_collar: boolean
}

export type { ProductsName, ProductsNameForm }
