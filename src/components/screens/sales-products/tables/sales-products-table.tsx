import { PlusOutlined } from "@ant-design/icons"
import { useNavigate } from "@tanstack/react-router"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import {
	type SalesProduct,
	useGetSalesProductsQuery
} from "src/services/sales-products"
import { GetParams } from "src/services/shared"
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
	const { t } = useTranslation()
	const { page, limit } = params
	const navigate = useNavigate()
	const {
		data: salesProducts,
		isLoading,
		isFetching
	} = useGetSalesProductsQuery({
		page: page || 1,
		limit: limit || 10
	})

	/* const toggleForm = useFormDevtoolsStore(state=>state.toggleForm)
 */
	const onClickButton = () => {
		navigate({
			to: "/sales/sales-product"
		})
	}
	const columns = useSalesProductsColumns()
	return (
		<>
			<Table<SalesProduct>
				rowKey={(record) => record.id}
				title={t("menu.sales_list")}
				extra={
					readonly ? null : (
						<div>
							<Button icon={<PlusOutlined />} onClick={onClickButton}>
								{t("add")}
							</Button>
					{/* 		<Button icon={<PlusOutlined />} onClick={toggleForm}>
								{t("add")}
							</Button> */}
						</div>
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
