import { ColumnsType } from "antd/es/table"
import { type FC } from "react"
import { Table } from "src/components/ui/table"
import { Tag } from "src/components/ui/tag"
import type { User } from "src/services/users"
import { formatEmpty, formatPhone } from "src/utils/formatter.utils"

interface CashierMiniTableProps {
	data?: User
}

const columns: ColumnsType<User> = [
	{
		title: "Телефон номер",
		dataIndex: "phone",
		key: "phone",
		render: formatPhone
	},
	{
		title: "Роль",
		dataIndex: "role",
		key: "role",
		render: (value?: User["role"]) => (
			<Tag roleId={value?.id}>{formatEmpty(value?.name)}</Tag>
		)
	}
]

const CashierMiniTable: FC<CashierMiniTableProps> = ({ data }) => {
	return (
		<>
			<Table<User>
				title={data && data?.name ? data?.name : "Кассир"}
				size={"small"}
				columns={columns}
				dataSource={data ? [data] : []}
				pagination={false}
			/>
		</>
	)
}

export { CashierMiniTable }
