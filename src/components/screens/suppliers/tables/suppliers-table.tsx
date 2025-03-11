import { PlusOutlined } from "@ant-design/icons"
import type { FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import { Route } from "src/routes/_layout/reports/suppliers"
import { type Supplier, useGetSuppliersQuery } from "src/services/suppliers"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useSuppliersColumns } from "../hooks/use-suppliers-columns"

const SuppliersStable: FC = () => {
	const { page, limit } = Route.useSearch()
	const routeNavigate = Route.useNavigate()

	const {
		data: suppliers,
		isLoading,
		isFetching
	} = useGetSuppliersQuery({
		page: page || 1,
		limit: limit || 10
	})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useSuppliersColumns()
	return (
		<>
			<Table<Supplier>
				rowKey={(record) => record.id}
				title={"Поставщики"}
				extra={
					<Button icon={<PlusOutlined />} onClick={toggleForm}>
						Добавить
					</Button>
				}
				columns={columns}
				loading={isLoading || isFetching}
				dataSource={suppliers?.data}
				pagination={{
					total: suppliers?.pagination?.count,
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

export { SuppliersStable }
