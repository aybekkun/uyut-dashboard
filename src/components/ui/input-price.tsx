import { ConfigProvider, InputNumber, InputNumberProps } from "antd"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { formatInputPrice } from "src/utils/formatter.utils"

const InputPrice = forwardRef<HTMLInputElement, InputNumberProps>(
	({ style, ...rest }, ref) => {
		const { t } = useTranslation()
		return (
			<ConfigProvider>
				<InputNumber
					ref={ref}
					placeholder={t("input_placeholder")}
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
