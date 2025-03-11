import { MoonFilled, SunOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { Button } from "src/components/ui/button"
import { useThemeStore } from "src/store/use-theme-store"

const ThemeButton: FC = () => {
	const { theme, toggleTheme } = useThemeStore()
	const isDark = theme === "dark"
	return (
		<>
			<Button
				type={"text"}
				icon={isDark ? <MoonFilled /> : <SunOutlined />}
				onClick={toggleTheme}
			/>
		</>
	)
}

export { ThemeButton }
