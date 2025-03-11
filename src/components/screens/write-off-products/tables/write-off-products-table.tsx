import { PlusOutlined } from "@ant-design/icons"
import type { FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import { GetParams } from "src/services/shared"
import {
	useGetWriteOffProductsQuery,
	type WriteOffProduct
} from "src/services/write-off-products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useWriteOffProductsColumns } from "../hooks/use-write-off-products-columns"

interface WriteOffProductsTableProps {
	params: GetParams
	onChangeParams: (params: GetParams) => void
	readonly?: boolean
}

const WriteOffProductsTable: FC<WriteOffProductsTableProps> = ({
	readonly,
	params,
	onChangeParams
}) => {
	const { page, limit } = params

	const {
		data: writeOffProducts,
		isLoading,
		isFetching
	} = useGetWriteOffProductsQuery({
		page: page || 1,
		limit: limit || 10
	})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useWriteOffProductsColumns()
	return (
		<>
			<Table<WriteOffProduct>
				title={"Списания товаров"}
				rowKey={(record) => record.id}
				extra={
					readonly ? null : (
						<Button icon={<PlusOutlined />} onClick={toggleForm}>
							Добавить
						</Button>
					)
				}
				columns={columns.filter((el) => (readonly ? el.key !== "actions" : el))}
				loading={isLoading || isFetching}
				dataSource={writeOffProducts?.data}
				pagination={{
					total: writeOffProducts?.pagination?.count,
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

export { WriteOffProductsTable }
