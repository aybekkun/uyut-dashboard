import { PlusOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import {
	ProductsName,
	useGetProductsNameQuery
} from "src/services/name"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useProductsNameColumns } from "../hooks/use-products-name-columns"
import { useTranslation } from "react-i18next"

const ProductsNameTable: FC = () => {
	const { t } = useTranslation()
	const {
		data: productsNames,
		isLoading,
		isFetching
	} = useGetProductsNameQuery({})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useProductsNameColumns()
	
	// Ensure we handle productsNames appropriately since get() returns Response<ProductsName>
	// which depends on if it's paginated or an array under `data`. 
	const dataSource = productsNames?.data || []

	return (
		<>
			<Table<ProductsName>
				rowKey={(record) => record.id}
				title={t("menu.settings_products_name")}
				extra={
					<Button icon={<PlusOutlined />} onClick={toggleForm}>
						{t("add")}
					</Button>
				}
				loading={isLoading || isFetching}
				columns={columns}
				dataSource={dataSource}
			/>
		</>
	)
}

export { ProductsNameTable }
