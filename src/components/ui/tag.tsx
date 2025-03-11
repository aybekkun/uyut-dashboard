import { Tag as AntdTag, TagProps as AntdTagProps } from "antd"
import { PresetColorType } from "antd/es/_util/colors"
import { forwardRef } from "react"
import { EnumRole } from "src/constants/storage.constants"

export interface TagProps extends AntdTagProps {
	roleId?: number
}

const roleColors: Record<EnumRole, PresetColorType> = {
	[EnumRole.PRINTER]: "geekblue-inverse",
	[EnumRole.DESIGNER]: "green-inverse",
	[EnumRole.DIRECTOR]: "magenta-inverse"
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
	({ roleId, color, ...rest }, ref) => {
		return (
			<AntdTag
				ref={ref}
				color={roleId ? roleColors[roleId as EnumRole] || "default" : color}
				{...rest}
			/>
		)
	}
)
Tag.displayName = "Tag"

export { Tag }
