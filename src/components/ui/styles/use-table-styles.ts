import { createStyles } from "antd-style"

export const useTableStyles = createStyles(({ token, css }) => ({
	table: css`
		.ant-table-title {
			border-bottom: 1px solid ${token.colorBorderSecondary};
		}
		.ant-pagination {
			margin: 0 !important;
			padding: ${token.padding}px ${token.padding}px;
			border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;
			background-color: ${token.colorBgContainer};

			.ant-pagination-item-active {
				background-color: ${token.colorPrimary};
				a {
					color: ${token.colorTextLightSolid};

					&:hover {
						filter: brightness(1.1);
					}
				}
			}
		}
	`
}))
