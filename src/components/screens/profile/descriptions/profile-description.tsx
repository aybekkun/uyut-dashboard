import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Descriptions, Space, theme } from "antd"
import { type FC } from "react"
import { useGetProfileQuery } from "src/services/login"
import { useProfileItems } from "../hooks/use-profile-items"

const ProfileDescription: FC = () => {
	const { data: profile } = useGetProfileQuery()

	const { token } = theme.useToken()

	const items = useProfileItems(profile?.data)
	return (
		<Card
			title={
				<Space>
					<Avatar
						icon={<UserOutlined />}
						style={{ backgroundColor: token.colorPrimary }}
						// style={{backgroundColor: }}
					/>
					{"Профиль"}
				</Space>
			}>
			<Descriptions layout={"vertical"} items={items} />
		</Card>
	)
}

export { ProfileDescription }
