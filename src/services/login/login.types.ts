import type { Role } from "src/services/shared/roles"

type LoginForm = {
	phone: string
	password: string
	remember: boolean
}

type LoginData = {
	phone: string
	token: string
}

type Profile = {
	id: number
	name: string
	phone: string
	role: Role
}

export type { LoginForm, LoginData, Profile }
