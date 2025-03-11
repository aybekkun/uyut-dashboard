import { Drawer, Layout, theme } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { MenuBar, ScrollNav } from "src/components/layout/sidebar/"
import { useMenuStore } from "src/store/use-menu-store"

const Sidebar: FC = () => {
	const { collapsed, toggleCollapsed } = useMenuStore()
	const { xl } = useResponsive()

	const { token } = theme.useToken()

	if (!xl)
		return (
			<Drawer
				open={collapsed}
				onClose={toggleCollapsed}
				width={270}
				placement={"left"}
				closable={false}
				styles={{
					body: {
						padding: 0,
						overflow: "hidden"
					}
				}}>
				<ScrollNav collapsed={collapsed}>
					<MenuBar />
				</ScrollNav>
			</Drawer>
		)
	return (
		<>
			<Layout.Sider
				width={270}
				collapsed={collapsed}
				style={{
					background: token.colorBgContainer,
					boxShadow: token.boxShadowSecondary
					// borderRight: `1px solid ${token.colorBorder}`
				}}>
				<ScrollNav collapsed={collapsed}>
					<MenuBar />
				</ScrollNav>
			</Layout.Sider>
		</>
	)
}

export { Sidebar }
