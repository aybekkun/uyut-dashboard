import { PlusOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import {
	ProductsCollar,
	useGetProductsCollarQuery
} from "src/services/collar"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useProductsCollarColumns } from "../hooks/use-products-collar-columns"
import { useTranslation } from "react-i18next"

const ProductsCollarTable: FC = () => {
	const { t } = useTranslation()
	const {
		data: productsCollars,
		isLoading,
		isFetching
	} = useGetProductsCollarQuery({})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useProductsCollarColumns()
	
	const dataSource = productsCollars?.data || []

	return (
		<>
			<Table<ProductsCollar>
				rowKey={(record) => record.id}
				title={t("menu.settings_products_collar")}
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

export { ProductsCollarTable }
