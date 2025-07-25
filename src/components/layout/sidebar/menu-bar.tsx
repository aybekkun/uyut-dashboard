import { useLocation, useRouter } from "@tanstack/react-router"
import { ConfigProvider, Menu, theme } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useMenuStore } from "src/store/use-menu-store"
import { useThemeStore } from "src/store/use-theme-store"
import { useMenu } from "./menu.data"
import { useGetProfileQuery } from "src/services/login"
import { useTranslation } from "react-i18next"
import { ROUTES } from "src/config/routes.config"
import { ExportOutlined } from "@ant-design/icons"
import { MenuProps } from "antd/lib"

const MenuBar: FC = () => {
	const router = useRouter()
	const menu = useMenu()
	const { data: profile } = useGetProfileQuery()
	const { t } = useTranslation()
	const { theme: mode } = useThemeStore()
	const { collapsed } = useMenuStore()
	const { pathname } = useLocation()
	const { xl } = useResponsive()

	const newMenu =
		profile?.data.role.name === "director"
			? (menu as MenuProps["items"]) // Директору доступно все меню
			: [
					{ key: ROUTES.SALES_GROUP, type: "group", label: t("menu.sales") },
					{
						key: ROUTES.SALES_PRODUCTS,
						icon: <ExportOutlined />,
						label: t("menu.sales_list")
					}
				]
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
						newMenu?.filter((el) =>
							collapsed && xl ? el?.type !== "group" : el
						) as MenuProps["items"]
					}
				/>
			</ConfigProvider>
		</>
	)
}

export { MenuBar }
