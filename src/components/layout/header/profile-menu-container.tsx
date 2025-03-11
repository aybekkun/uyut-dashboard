import { UserOutlined } from "@ant-design/icons"
import { useLocation, useRouter } from "@tanstack/react-router"
import { ConfigProvider, Divider, Flex, Menu, Popover } from "antd"
import { type FC, type PropsWithChildren, useCallback } from "react"
import { Button } from "src/components/ui"
import { ROUTES } from "src/config/routes.config"
import { useAuth } from "src/hooks/use-auth"
import { useThemeStore } from "src/store/use-theme-store"

const ProfileMenuContainer: FC<PropsWithChildren> = ({ children }) => {
	const { theme: mode } = useThemeStore()
	const router = useRouter()
	const { pathname } = useLocation()
	const auth = useAuth()

	const onLogout = useCallback(() => {
		auth.logout()
		router.invalidate()
	}, [auth, router])

	return (
		<Popover
			trigger={"click"}
			arrow={false}
			styles={{
				body: {
					width: 150
				}
			}}
			placement={"bottomRight"}
			content={
				<Flex vertical={true}>
					<ConfigProvider
						theme={{
							components: {
								Menu: {
									itemHeight: 32,
									iconSize: 16,
									iconMarginInlineEnd: 10
								}
							}
						}}>
						<Menu
							mode={"inline"}
							defaultSelectedKeys={[pathname]}
							selectedKeys={[pathname]}
							theme={mode}
							onSelect={(item) => router.history.push(item.key)}
							items={[
								{
									key: ROUTES.PROFILE,
									icon: <UserOutlined />,
									label: "My Profile",
									style: {
										paddingLeft: 12,
										paddingRight: 12
									}
								}
							]}
						/>
					</ConfigProvider>
					<Divider style={{ margin: 8 }} />
					<Button danger={true} onClick={onLogout}>
						Logout
					</Button>
				</Flex>
			}>
			{children}
		</Popover>
	)
}

export { ProfileMenuContainer }
