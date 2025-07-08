import { DescriptionsProps } from "antd"
import { useTranslation } from "react-i18next"
import { Tag } from "src/components/ui"
import { Profile } from "src/services/login"
import { formatEmpty, formatPhone } from "src/utils/formatter.utils"

const useProfileItems = (data?: Profile) => {
	const { t } = useTranslation()
	const items: DescriptionsProps["items"] = [
		{
			key: "name",
			label: t("fio"),
			children: formatEmpty(data?.name)
		},
		{
			key: "phone",
			label: t("phone_number"),
			children: formatPhone(data?.phone)
		},
		{
			key: "role",
			label: t("role"),
			children: (
				<Tag roleId={data?.role?.id}>{formatEmpty(data?.role.name)}</Tag>
			)
		}
	]

	return items
}

export { useProfileItems }
