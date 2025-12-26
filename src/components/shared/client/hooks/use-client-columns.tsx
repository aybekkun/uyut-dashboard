import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { Client } from "src/services/shared/clients"
import { formatPhone } from "src/utils/formatter.utils"

export const useClientColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<Client> = [
		{
			title: t("phone_number"),
			dataIndex: "phone",
			key: "phone",
			render: formatPhone
		}
	]

	return columns
}
