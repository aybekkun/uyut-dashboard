import { type MenuTheme } from "antd"
import { EnumTheme } from "src/constants/storage.constants"
import { getTheme, saveTheme } from "src/utils/storage.utils"
import { create } from "zustand"

interface ThemeStore {
	theme: MenuTheme
	toggleTheme: () => void
}

const useThemeStore = create<ThemeStore>()((set) => ({
	theme: getTheme(),
	toggleTheme: () =>
		set((state) => {
			const theme =
				state.theme === EnumTheme.LIGHT ? EnumTheme.DARK : EnumTheme.LIGHT
			saveTheme(theme)
			return { theme }
		})
}))

export { useThemeStore }
