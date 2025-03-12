import { RouterProvider } from "@tanstack/react-router"
import { Suspense, type FC } from "react"
import { useAuth } from "src/hooks/use-auth"
import { router } from "src/router"
import AppStyle from "./styles/app-styles"

const App: FC = () => {
	const auth = useAuth()

	return (
		<>
			<Suspense fallback={<div>Загрузка</div>}>
				<AppStyle />
				<RouterProvider router={router} context={{ auth }} />
			</Suspense>
		</>
	)
}

export { App }
