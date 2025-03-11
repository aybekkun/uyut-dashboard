import { type FC, type PropsWithChildren, useState } from "react"
import { AuthContext } from "src/context/auth-context"
import { getToken, removeToken, saveToken } from "src/utils/storage.utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [token, setToken] = useState<string | null>(getToken())
	const isAuth = !!token
	
	const login = (token: string, remember?: boolean) => {
		saveToken(token, remember)
		setToken(token)
	}
	
	const logout = () => {
		removeToken()
		setToken(null)
	}
	
	return (
		<AuthContext.Provider
			value={{
				isAuth,
				token,
				logout,
				login,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider }
