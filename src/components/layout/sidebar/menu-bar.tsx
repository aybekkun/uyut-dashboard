import { useLocation, useRouter } from "@tanstack/react-router"
import { ConfigProvider, Menu, theme } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useMenuStore } from "src/store/use-menu-store"
import { useThemeStore } from "src/store/use-theme-store"
import { menu } from "./menu.data"

const MenuBar: FC = () => {
	const router = useRouter()
	const { theme: mode } = useThemeStore()
	const { collapsed } = useMenuStore()
	const { pathname } = useLocation()
	const { xl } = useResponsive()

	const onSelectMenu = (key: string) => {
		router.navigate({
			href: key
		})
	}

	const { token } = theme.useToken()
	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Menu: {
							itemBorderRadius: 8
						}
					}
				}}>
				<Menu
					mode={"inline"}
					theme={mode}
					defaultSelectedKeys={[pathname]}
					selectedKeys={[pathname]}
					onSelect={(item) => onSelectMenu(item.key)}
					style={{
						borderRight: 0,
						background: token.colorBgContainer
					}}
					items={menu?.filter((el) =>
						collapsed && xl ? el?.type !== "group" : el
					)}
				/>
			</ConfigProvider>
		</>
	)
}

export { MenuBar }
