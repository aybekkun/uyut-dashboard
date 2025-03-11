import { Layout } from "antd"
import { type  FC, PropsWithChildren } from "react"

const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Layout style={{
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		}}>
			{children}
		</Layout>
	)
}

export { LoginLayout }
