import { App } from "antd"

const useMessage = () => {
	const { notification } = App.useApp()

	return { message: notification }
}

export { useMessage }
