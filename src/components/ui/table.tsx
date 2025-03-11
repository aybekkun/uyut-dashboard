import {
	ConfigProvider,
	Flex,
	Space,
	Table as AntdTable,
	type TableProps as AntdTableProps,
	theme,
	Typography
} from "antd"
import type { AnyObject } from "antd/es/_util/type"
import useSize from "antd/es/config-provider/hooks/useSize"
import { TitleProps } from "antd/es/typography/Title"
import type { ReactNode } from "react"
import { useTableStyles } from "./styles/use-table-styles"

interface TableProps<T> extends Omit<AntdTableProps<T>, "title"> {
	title?: string
	titleProps?: TitleProps
	extra?: ReactNode
}

const Table = <T extends AnyObject>({
	title,
	titleProps,
	extra,
	className,
	...rest
}: TableProps<T>) => {
	const { styles, cx } = useTableStyles()
	const size = useSize(rest.size)
	const { token } = theme.useToken()
	return (
		<ConfigProvider
			theme={{
				components: {
					Table: {
						headerBg: token.colorBgContainer
					}
				}
			}}>
			<AntdTable<T>
				className={cx(styles.table, className)}
				title={() => (
					<Flex gap={8} justify={title ? "space-between" : "end"}>
						{title && (
							<Typography.Title
								{...titleProps}
								style={{
									display: "inline-block",
									overflow: "hidden",
									whiteSpace: "nowrap",
									textWrap: "nowrap",
									textOverflow: "ellipsis"
								}}
								level={titleProps?.level || (size === "small" ? 5 : 4)}>
								{title}
							</Typography.Title>
						)}
						<Space>{extra}</Space>
					</Flex>
				)}
				scroll={{
					x: "auto"
				}}
				{...rest}
			/>
		</ConfigProvider>
	)
}

export { Table }
