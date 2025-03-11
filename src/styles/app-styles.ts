import { createGlobalStyle, css } from "antd-style"

const AppStyles = createGlobalStyle(({ theme }) => {
	return css`
		*,
		*::after,
		*::before {
			scrollbar-color: ${theme.colorBorder} transparent;
		}

		html {
			scrollbar-color: ${theme.colorBorder} transparent;
		}
	`
})

export default AppStyles
