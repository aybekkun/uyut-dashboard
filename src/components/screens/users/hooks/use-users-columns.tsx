import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import { Tag } from "src/components/ui/tag"
import { useDeleteUsersMutation, User } from "src/services/users"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty, formatPhone } from "src/utils/formatter.utils"

export const useUsersColumns = () => {
	const { mutate: deleteUser } = useDeleteUsersMutation()

	const editUser = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<User> = [
		{
			title: "ФИО",
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
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
			render: (role: User["role"]) => (
				<Tag roleId={role?.id} style={{ textTransform: "capitalize" }}>
					{formatEmpty(role?.name)}
				</Tag>
			)
		},
		{
			width: 100,
			fixed: "right",
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editUser(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteUser(record?.id)
						}}
						tooltip={"Удалить"}
						danger={true}
						icon={<DeleteFilled />}
					/>
				</Space>
			)
		}
	]
	return columns
}
