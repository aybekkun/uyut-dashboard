import { UserOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { Avatar, Skeleton, Space, theme, Typography } from "antd"
import capitalize from "antd/es/_util/capitalize"
import { type FC, useEffect } from "react"
import { useAuth } from "src/hooks/use-auth"
import { useGetProfileQuery } from "src/services/login"
import { ProfileMenuContainer } from "./profile-menu-container"

const ProfileAvatar: FC = () => {
	const router = useRouter()
	const auth = useAuth()

	const { data: profile, isError, isLoading } = useGetProfileQuery()

	const { token } = theme.useToken()

	useEffect(() => {
		if (isError) {
			auth.logout()
			router.invalidate()
		}
	}, [auth, isError, router])
	return (
		<ProfileMenuContainer>
			<Space style={{ cursor: "pointer", userSelect: "none" }} align={"center"}>
				<Avatar
					src={"/logo-alt.png"}
					alt={""}
					draggable={false}
					style={{ backgroundColor: token.colorPrimary, padding: 3 }}
					icon={<UserOutlined />}>
					{capitalize(profile?.data?.role?.name?.[0] || "")}
				</Avatar>
				<Typography.Text>
					{isLoading ? (
						<Skeleton.Input
							active={true}
							style={{ minWidth: 100, width: 100, height: 24 }}
						/>
					) : (
						profile?.data?.name || profile?.data?.role?.name
					)}
				</Typography.Text>
			</Space>
		</ProfileMenuContainer>
	)
}

export { ProfileAvatar }
