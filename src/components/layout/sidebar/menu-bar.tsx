import { useLocation, useRouter } from "@tanstack/react-router"
import { ConfigProvider, Menu, theme } from "antd"
import { useResponsive } from "antd-style"
import { type FC, useMemo } from "react"
import { useMenuStore } from "src/store/use-menu-store"
import { useThemeStore } from "src/store/use-theme-store"
import { useMenu } from "./menu.data"
import { useGetProfileQuery } from "src/services/login"
import { useTranslation } from "react-i18next"
import { ROUTES } from "src/config/routes.config"
import { ExportOutlined } from "@ant-design/icons"
import { MenuProps } from "antd"

interface MoveableMenuItem {
	key: string
	label: React.ReactNode
	type?: string
}

const MenuBar: FC = () => {
	const router = useRouter()
	const menu = useMenu()
	const { data: profile } = useGetProfileQuery()
	const { t } = useTranslation()
	const { theme: mode } = useThemeStore()
	const { collapsed } = useMenuStore()
	const { pathname } = useLocation()
	const { xl } = useResponsive()

	const currentMenu = useMemo(
		() =>
			profile?.data.role.name === "direktor"
				? (menu as MenuProps["items"])
				: [
						{ key: ROUTES.SALES_GROUP, type: "group", label: t("menu.sales") },
						{
							key: ROUTES.SALES_PRODUCTS,
							icon: <ExportOutlined />,
							label: t("menu.sales_list")
						}
					],
		[profile?.data.role.name, menu, t]
	)



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
					items={
						currentMenu?.filter((el) => {
							const item = el as MoveableMenuItem
							return collapsed && xl ? item?.type !== "group" : el
						}) as MenuProps["items"]
					}
				/>
			</ConfigProvider>
		</>
	)
}

export { MenuBar }
