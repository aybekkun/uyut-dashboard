import type { ColumnsType } from "antd/es/table"
import { Client } from "src/services/shared/clients"
import { formatPhone } from "src/utils/formatter.utils"

export const useClientColumns = () => {
	const columns: ColumnsType<Client> = [
		{
			title: "Телефон номер",
			dataIndex: "phone",
			key: "phone",
			render: formatPhone
		}
	]

	return columns
}
