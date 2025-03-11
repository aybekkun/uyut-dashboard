import { ConfigProvider, Input as AntdInput, InputProps, InputRef } from "antd"
import { forwardRef } from "react"
import { INPUT_PLACEHOLDER } from "src/constants/form.constants"

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
	return (
		<ConfigProvider>
			<AntdInput ref={ref} placeholder={INPUT_PLACEHOLDER} {...props} />
		</ConfigProvider>
	)
})
Input.displayName = "Input"

export { Input }
