import { QueryClientProvider } from "@tanstack/react-query"
import { type FC, type PropsWithChildren } from "react"
import { queryClient } from "src/config/react-query.config"

const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export { ReactQueryProvider }
