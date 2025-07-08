import { PlusOutlined } from "@ant-design/icons"
import { FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import { type ProductItem, useGetProductsQuery } from "src/services/products"
import { GetParams } from "src/services/shared"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useProductsColumns } from "../hooks/use-products-columns"
import { useTranslation } from "react-i18next"

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
	const { t } = useTranslation()
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
			<Table<ProductItem>
				rowKey={(record) => record.id}
				title={t("products")}
				extra={
					readonly ? null : (
						<Button icon={<PlusOutlined />} onClick={toggleForm}>
							{t("add")}
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
