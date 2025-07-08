import { FC } from "react"

import { Table } from "src/components/ui/table"
import {
	ProductTransactions,
	useGetProductsByIdQuery
} from "src/services/products"
import { GetParams } from "src/services/shared"

import { useProductColumns } from "../hooks/use-product-columns"
import { ProductDescription } from "../desctiptions/product-description"
import { useTranslation } from "react-i18next"

interface ProductTableProps {
	id?: number | string
	params: GetParams
	onChangeParams: (params: GetParams) => void
}

const ProductTable: FC<ProductTableProps> = ({
	id,
	params,
	onChangeParams
}) => {
	const { t } = useTranslation()
	const { page, limit } = params
	const {
		data: products,
		isLoading,
		isFetching
	} = useGetProductsByIdQuery({
		id,
		page: page || 1,
		limit: limit || 10
	})

	const columns = useProductColumns()
	return (
		<>
			<ProductDescription
				data={products?.data}
				isLoading={isLoading}
				isFetching={isFetching}
			/>
			<Table<ProductTransactions>
				rowKey={(record) => record.id}
				title={t("products")}
				loading={isLoading || isFetching}
				columns={columns}
				dataSource={products?.transactions}
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

export { ProductTable }
