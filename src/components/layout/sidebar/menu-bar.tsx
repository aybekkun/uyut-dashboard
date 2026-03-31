import { useLocation, useRouter } from "@tanstack/react-router"
import { ConfigProvider, Menu, theme, Button, Space } from "antd"
import { useResponsive } from "antd-style"
import { type FC, useEffect, useMemo } from "react"
import { useMenuStore } from "src/store/use-menu-store"
import { useThemeStore } from "src/store/use-theme-store"
import { useMenu } from "./menu.data"
import { useGetProfileQuery } from "src/services/login"
import { useTranslation } from "react-i18next"
import { ROUTES } from "src/config/routes.config"
import {
	ExportOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined
} from "@ant-design/icons"
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
	const { collapsed, order, setOrder, moveUp, moveDown } = useMenuStore()
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

	useEffect(() => {
		if (currentMenu && order.length === 0) {
			const initialOrder = (currentMenu as MoveableMenuItem[])
				.filter((item) => item && item.type !== "group")
				.map((item) => item.key)
			setOrder(initialOrder)
		}
	}, [currentMenu, order.length, setOrder])

	const sortedMenu = useMemo(() => {
		if (!currentMenu || order.length === 0) return currentMenu

		const menuItems = currentMenu as MoveableMenuItem[]
		const movables = [...menuItems].filter((item) => item && item.type !== "group")

		movables.sort((a, b) => {
			const iA = order.indexOf(a.key)
			const iB = order.indexOf(b.key)
			return (iA === -1 ? 999 : iA) - (iB === -1 ? 999 : iB)
		})

		let movableIdx = 0
		return menuItems.map((item) => {
			if (item && item.type !== "group") {
				const sortedItem = movables[movableIdx++]
				if (!sortedItem) return item

				return {
					...sortedItem,
					label: (
						<div
							className="menu-item-label"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%"
							}}>
							<span>{sortedItem.label}</span>
							{!collapsed && (
								<Space
									className="reorder-buttons"
									size={0}
									onClick={(e) => e.stopPropagation()}>
									<Button
										type="text"
										size="small"
										style={{ padding: "0 4px", height: 20 }}
										icon={<ArrowUpOutlined style={{ fontSize: 10 }} />}
										onClick={(e) => {
											e.stopPropagation()
											moveUp(sortedItem.key)
										}}
									/>
									<Button
										type="text"
										size="small"
										style={{ padding: "0 4px", height: 20 }}
										icon={<ArrowDownOutlined style={{ fontSize: 10 }} />}
										onClick={(e) => {
											e.stopPropagation()
											moveDown(sortedItem.key)
										}}
									/>
								</Space>
							)}
						</div>
					)
				}
			}
			return item
		})
	}, [currentMenu, order, moveUp, moveDown, collapsed])

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
						sortedMenu?.filter((el) => {
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
