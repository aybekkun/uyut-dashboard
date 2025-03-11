import { MenuOutlined } from "@ant-design/icons"
import { Button, Flex, Layout, Space, theme } from "antd"
import { useResponsive } from "antd-style"
import { type FC, PropsWithChildren } from "react"
import { Logo } from "src/components/shared/logo"
import { useMenuStore } from "src/store/use-menu-store"
import { ProfileAvatar } from "./header/profile-avatar"
import { ThemeButton } from "./header/theme-button"

const Header: FC<PropsWithChildren> = () => {
	const toggleCollapsed = useMenuStore((state) => state.toggleCollapsed)
	const { xl } = useResponsive()
	const {
		token: { colorBgContainer, boxShadowSecondary, paddingLG }
	} = theme.useToken()
	return (
		<>
			<Layout.Header
				style={{
					display: "flex",
					alignItems: "center",
					backgroundColor: colorBgContainer,
					boxShadow: boxShadowSecondary,
					zIndex: 100
				}}>
				<Flex
					align={"center"}
					style={{
						flexBasis: xl ? 270 : "auto",
						paddingLeft: paddingLG,
						paddingRight: paddingLG
					}}>
					<Logo />
				</Flex>
				<Flex
					justify={"space-between"}
					flex={1}
					style={{ paddingLeft: paddingLG, paddingRight: paddingLG }}>
					<Space>
						<Button
							type={"text"}
							onClick={toggleCollapsed}
							icon={<MenuOutlined />}
						/>
					</Space>
					<Space>
						<ThemeButton />
						<ProfileAvatar />
					</Space>
				</Flex>
			</Layout.Header>
		</>
	)
}

export { Header }
