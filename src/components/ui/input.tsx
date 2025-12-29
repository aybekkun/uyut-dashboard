import { Input as AntdInput, ConfigProvider, InputProps, InputRef } from "antd"
import React, { forwardRef } from "react"
import { useTranslation } from "react-i18next"

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
	const { t } = useTranslation()
	return (
		<ConfigProvider>
			<AntdInput ref={ref} placeholder={t("input_placeholder")} {...props} />
		</ConfigProvider>
	)
}) as React.ForwardRefExoticComponent<
	InputProps & React.RefAttributes<InputRef>
> & {
	TextArea: typeof AntdInput.TextArea
}

Input.displayName = "Input"
Input.TextArea = AntdInput.TextArea

export { Input }
