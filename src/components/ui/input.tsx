import { Input as AntdInput, ConfigProvider, InputProps, InputRef } from "antd"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
	const { t } = useTranslation()
	return (
		<ConfigProvider>
			<AntdInput ref={ref} placeholder={t("input_placeholder")} {...props} />
		</ConfigProvider>
	)
})
Input.displayName = "Input"

export { Input }
