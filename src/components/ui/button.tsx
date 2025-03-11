import {
	Button as AntdButton,
	ButtonProps as AntdButtonProps,
	ConfigProvider,
	Popconfirm,
	theme,
	Tooltip
} from "antd"
import { forwardRef } from "react"

interface ButtonProps extends AntdButtonProps {
	tooltip?: string
	confirm?: {
		title: string
		onConfirm: () => void
	}
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ tooltip, confirm, ...rest }, ref) => {
		// Основной контент кнопки
		const buttonContent = <AntdButton ref={ref} type={"primary"} {...rest} />

		// Обёртка для Tooltip
		const withTooltip = tooltip ? (
			<Tooltip title={tooltip}>{buttonContent}</Tooltip>
		) : (
			buttonContent
		)

		// Обёртка для Popconfirm
		const withPopconfirm = confirm ? (
			<Popconfirm placement={"bottomRight"} {...confirm}>
				{withTooltip}
			</Popconfirm>
		) : (
			withTooltip
		)

		const { token } = theme.useToken()
		return (
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: rest.color || token.colorPrimary
					}
				}}>
				{withPopconfirm}
			</ConfigProvider>
		)
	}
)
Button.displayName = "Button"

export { Button }
