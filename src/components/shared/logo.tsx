import { Image, Space, Typography } from "antd"
import { type FC } from "react"

const Logo: FC = () => {
	return (
		<Space align={"center"} size={12}>
			<Image
				preview={false}
				style={{ width: 38, height: 38 }}
				src={"/logo.png"}
				fallback={"/public/apple-touch-icon.png"}
				alt={""}
			/>
			<Typography.Title level={3}>UYUT</Typography.Title>
		</Space>
	)
}

export { Logo }
