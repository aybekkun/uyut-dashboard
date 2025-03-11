import { DescriptionsProps } from "antd"
import { Tag } from "src/components/ui"
import { Profile } from "src/services/login"
import { formatEmpty, formatPhone } from "src/utils/formatter.utils"

const useProfileItems = (data?: Profile) => {
	const items: DescriptionsProps["items"] = [
		{
			key: "name",
			label: "ФИО",
			children: formatEmpty(data?.name)
		},
		{
			key: "phone",
			label: "Телефон номер",
			children: formatPhone(data?.phone)
		},
		{
			key: "role",
			label: "Роль",
			children: (
				<Tag roleId={data?.role?.id}>{formatEmpty(data?.role.name)}</Tag>
			)
		}
	]

	return items
}

export { useProfileItems }
