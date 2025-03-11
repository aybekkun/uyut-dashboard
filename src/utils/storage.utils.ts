import Cookies from "js-cookie"
import { EnumCookies, EnumTheme } from "src/constants/storage.constants"

export const getToken = () => {
	return Cookies.get(EnumCookies.TOKEN) || ""
}

export const saveToken = (token: string, remember?: boolean) => {
	Cookies.set(EnumCookies.TOKEN, token, {
		sameSite: "strict",
		expires: remember ? 30 : 7
	})
}

export const removeToken = () => {
	Cookies.remove(EnumCookies.TOKEN)
}

export const getTheme = (): EnumTheme => {
	return (Cookies.get(EnumCookies.THEME) as EnumTheme) || EnumTheme.LIGHT
}

export const saveTheme = (theme: EnumTheme) => {
	Cookies.set(EnumCookies.THEME, theme)
}
