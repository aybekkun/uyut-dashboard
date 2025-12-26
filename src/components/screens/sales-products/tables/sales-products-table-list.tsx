import Table from "antd/es/table"
import { FC } from "react"

import { type SalesProduct } from "src/services/sales-products"
import { useSalesProductsTableListColumns } from "../hooks/use-sales-products-table-list-columns"


interface SalesProductsTableListProps {
	data: SalesProduct["products"][]
}

const SalesProductsTableList: FC<SalesProductsTableListProps> = ({
	data = []
}) => {
	const columns = useSalesProductsTableListColumns()
	return (
		<>
			<Table<SalesProduct["products"]>
				columns={columns}
				dataSource={data}
				pagination={false}
				rowKey="id"
			/>
		</>
	)
}

export { SalesProductsTableList }
