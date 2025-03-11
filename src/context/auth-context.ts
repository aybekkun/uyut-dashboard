import { createContext } from "react"

export interface AuthContext {
	isAuth: boolean
	token: string | null
	login: (token: string, remember?: boolean) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContext | null>(null)
