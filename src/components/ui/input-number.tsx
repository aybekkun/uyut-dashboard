import {
	InputNumber as AntdInputNumber,
	ConfigProvider,
	InputNumberProps
} from "antd"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
	({ style, ...rest }, ref) => {
		const { t } = useTranslation()
		return (
			<ConfigProvider>
				<AntdInputNumber
					ref={ref}
					placeholder={t("input_placeholder")}
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
