import {
	ConfigProvider,
	InputNumber as AntdInputNumber,
	InputNumberProps
} from "antd"
import { forwardRef } from "react"
import { INPUT_PLACEHOLDER } from "src/constants/form.constants"

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
	({ style, ...rest }, ref) => {
		return (
			<ConfigProvider>
				<AntdInputNumber
					ref={ref}
					placeholder={INPUT_PLACEHOLDER}
					style={{ width: "100%", ...style }}
					min={0}
					{...rest}
				/>
			</ConfigProvider>
		)
	}
)
InputNumber.displayName = "InputNumber"

export { InputNumber }
