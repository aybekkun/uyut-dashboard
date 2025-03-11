import { ArrowLeftOutlined } from "@ant-design/icons"
import { NotFoundRouteProps, useRouter } from "@tanstack/react-router"
import { Button, Flex, Result, Space } from "antd"
import { type FC, PropsWithChildren } from "react"
import { ROUTES } from "src/config/routes.config"
import { MainLayout } from "./main-layout"

const NotFound: FC<PropsWithChildren<NotFoundRouteProps>> = ({ children }) => {
	const router = useRouter()

	return (
		<MainLayout>
			<Flex align={"center"} justify={"center"} style={{ height: "100vh" }}>
				<Result
					status={"404"}
					title={"404"}
					extra={
						<Space>
							<Button
								icon={<ArrowLeftOutlined />}
								type={"primary"}
								onClick={() => router.history.back()}>
								Назад
							</Button>
							<Button
								type={"link"}
								onClick={() => router.history.replace(ROUTES.HOME)}>
								На главную
							</Button>
						</Space>
					}>
					<div>
						{children || <p>Страница, которую вы ищете, не существует.</p>}
					</div>
				</Result>
			</Flex>
		</MainLayout>
	)
}

export { NotFound }
