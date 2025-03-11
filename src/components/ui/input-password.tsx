import { ConfigProvider, Input, type InputRef } from "antd"
import { type PasswordProps } from "antd/es/input"
import { forwardRef } from "react"
import { INPUT_PLACEHOLDER } from "src/constants/form.constants"

const InputPassword = forwardRef<InputRef, PasswordProps>((props, ref) => {
	return (
		<ConfigProvider>
			<Input.Password ref={ref} placeholder={INPUT_PLACEHOLDER} {...props} />
		</ConfigProvider>
	)
})
InputPassword.displayName = "InputPassword"

export { InputPassword }
