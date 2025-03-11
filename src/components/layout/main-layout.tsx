import { Layout, type LayoutProps } from "antd"
import type { FC, PropsWithChildren } from "react"

const MainLayout: FC<PropsWithChildren<LayoutProps>> = ({
	children,
	style,
	...rest
}) => {
	return (
		<Layout style={{ height: "100vh", width: "100vw", ...style }} {...rest}>
			{children}
		</Layout>
	)
}

export { MainLayout }
