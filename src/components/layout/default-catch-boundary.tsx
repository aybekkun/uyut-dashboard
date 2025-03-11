import { ReloadOutlined } from "@ant-design/icons"
import {
	ErrorComponent,
	ErrorComponentProps,
	Link,
	rootRouteId,
	useMatch,
	useRouter
} from "@tanstack/react-router"
import { Button, Flex, Result, Space } from "antd"
import { type FC } from "react"
import { MainLayout } from "./main-layout"

const DefaultCatchBoundary: FC<ErrorComponentProps> = ({ error }) => {
	const router = useRouter()
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId
	})

	return (
		<MainLayout
			style={
				isRoot
					? { height: "100vh", width: "100%" }
					: {
							flexGrow: 1,
							height: "100%",
							width: "100%"
						}
			}>
			<Flex align={"center"} justify={"center"} style={{ height: "100%" }}>
				<Result
					status={"500"}
					extra={
						<Space>
							<Button
								icon={<ReloadOutlined />}
								type={"primary"}
								onClick={() => {
									router.invalidate()
								}}>
								Перезагрузить
							</Button>
							{isRoot ? (
								<Link
									to={"/"}
									className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}>
									Главная
								</Link>
							) : (
								<Link
									to={"/"}
									className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
									onClick={(e) => {
										e.preventDefault()
										window.history.back()
									}}>
									Назад
								</Link>
							)}
						</Space>
					}>
					<ErrorComponent error={error} />
				</Result>
			</Flex>
		</MainLayout>
	)
}

export { DefaultCatchBoundary }
