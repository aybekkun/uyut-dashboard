import { PlusOutlined } from "@ant-design/icons"
import type { FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import { Route } from "src/routes/_layout/employees/users"
import { useGetUsersQuery, User } from "src/services/users"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useUsersColumns } from "../hooks/use-users-columns"

const UsersTable: FC = () => {
	const { page, limit } = Route.useSearch()
	const routeNavigate = Route.useNavigate()

	const {
		data: users,
		isLoading,
		isFetching
	} = useGetUsersQuery({
		page: page || 1,
		limit: limit || 10
	})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useUsersColumns()
	return (
		<>
			<Table<User>
				rowKey={(record) => record.id}
				title={"Сотрудники"}
				extra={
					<Button icon={<PlusOutlined />} onClick={toggleForm}>
						Добавить
					</Button>
				}
				columns={columns}
				loading={isLoading || isFetching}
				dataSource={users?.data}
				pagination={{
					total: users?.pagination?.count,
					onChange: (page, limit) => {
						routeNavigate({
							search: (prev) => ({
								...prev,
								page,
								limit
							})
						})
					}
				}}
			/>
		</>
	)
}

export { UsersTable }
