import { createStyles, css } from "antd-style"

interface StylesSidebarProps {
	collapsed?: boolean
}

export const useStylesSidebar = createStyles(
	({ token }, { collapsed }: StylesSidebarProps) => ({
		nav: css`
			height: calc(100vh - 68px);
			padding: ${collapsed ? `${token.padding}px 8px` : `${token.padding}px`};
			overflow-x: hidden;
			overflow-y: auto;

			&,
			&::after,
			&::before {
				transition: all 0.2s;
				scrollbar-color: transparent transparent;

				&:hover {
					scrollbar-color: ${token.colorBorder} transparent;
				}
			}

			&:hover {
				scrollbar-color: ${token.colorBorder} transparent;
			}
		`
	})
)
