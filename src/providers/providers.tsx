import { type FC, type PropsWithChildren } from "react"
import { AntdProvider } from "./antd/antd-provider"
import { AuthProvider } from "./auth/auth-provider"
import { ReactQueryProvider } from "./react-query/react-query-provider"

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ReactQueryProvider>
			<AntdProvider>
				<AuthProvider>{children}</AuthProvider>
			</AntdProvider>
		</ReactQueryProvider>
	)
}

export { Providers }
