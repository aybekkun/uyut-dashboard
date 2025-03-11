import type { Role } from "src/services/shared/roles"

type User = {
	id: number
	name: string
	phone: string
	role: Role
}

type UserForm = {
	id?: number
	name: string
	phone: string
	password: string
	role_id: number
}

export type { User, UserForm }
