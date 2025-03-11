import { PlusOutlined } from "@ant-design/icons"
import { FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import { type Product, useGetProductsQuery } from "src/services/products"
import { GetParams } from "src/services/shared"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useProductsColumns } from "../hooks/use-products-columns"

interface ProductsTableProps {
	params: GetParams
	onChangeParams: (params: GetParams) => void
	readonly?: boolean
}

const ProductsTable: FC<ProductsTableProps> = ({
	readonly,
	params,
	onChangeParams
}) => {
	const { page, limit } = params
	const {
		data: products,
		isLoading,
		isFetching
	} = useGetProductsQuery({
		page: page || 1,
		limit: limit || 10
	})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useProductsColumns()
	return (
		<>
			<Table<Product>
				rowKey={(record) => record.id}
				title={"Товары"}
				extra={
					readonly ? null : (
						<Button icon={<PlusOutlined />} onClick={toggleForm}>
							Добавить
						</Button>
					)
				}
				loading={isLoading || isFetching}
				columns={columns}
				dataSource={products?.data}
				pagination={{
					total: products?.pagination?.count,
					onChange: (page, limit) => {
						onChangeParams({ page, limit })
					}
				}}
			/>
		</>
	)
}

export { ProductsTable }
