import { PlusOutlined } from "@ant-design/icons"
import { FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import {
	type SalesProduct,
	useGetSalesProductsQuery
} from "src/services/sales-products"
import { GetParams } from "src/services/shared"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useSalesProductsColumns } from "../hooks/use-sales-products-columns"

interface SalesProductsTableProps {
	params: GetParams
	onChangeParams: (params: GetParams) => void
	readonly?: boolean
}

const SalesProductsTable: FC<SalesProductsTableProps> = ({
	params,
	onChangeParams,
	readonly
}) => {
	const { page, limit } = params

	const {
		data: salesProducts,
		isLoading,
		isFetching
	} = useGetSalesProductsQuery({
		page: page || 1,
		limit: limit || 10
	})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useSalesProductsColumns()
	return (
		<>
			<Table<SalesProduct>
				rowKey={(record) => record.id}
				title={"Проданные товары"}
				extra={
					readonly ? null : (
						<Button icon={<PlusOutlined />} onClick={toggleForm}>
							Добавить
						</Button>
					)
				}
				columns={columns.filter((el) => (readonly ? el.key !== "actions" : el))}
				dataSource={salesProducts?.data}
				loading={isLoading || isFetching}
				pagination={{
					total: salesProducts?.pagination?.count,
					onChange: (page, limit) => {
						onChangeParams({
							page,
							limit
						})
					}
				}}
			/>
		</>
	)
}

export { SalesProductsTable }
