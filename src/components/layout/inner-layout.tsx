import { Layout } from "antd"
import { type FC, PropsWithChildren } from "react"

const InnerLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Layout hasSider={true}>{children}</Layout>
		</>
	)
}

export { InnerLayout }
