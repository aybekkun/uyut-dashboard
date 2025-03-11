import { ConfigProvider, InputNumber, InputNumberProps } from "antd"
import { forwardRef } from "react"
import { INPUT_PLACEHOLDER } from "src/constants/form.constants"
import { formatInputPrice } from "src/utils/formatter.utils"

const InputPrice = forwardRef<HTMLInputElement, InputNumberProps>(
	({ style, ...rest }, ref) => {
		return (
			<ConfigProvider>
				<InputNumber
					ref={ref}
					placeholder={INPUT_PLACEHOLDER}
					formatter={formatInputPrice}
					min={0}
					style={{ width: "100%", ...style }}
					{...rest}
				/>
			</ConfigProvider>
		)
	}
)
InputPrice.displayName = "InputPrice"

export { InputPrice }
