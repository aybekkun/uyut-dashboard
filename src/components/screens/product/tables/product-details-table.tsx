import { PlusOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { useProductDetailsColumns } from "src/components/screens/product"
import { Button, Table } from "src/components/ui"
import { useGetProductsPrintDetailsByIdQuery } from "src/services/products"
import { PrintDetail } from "src/services/products/print-details"
import { ParamId } from "src/services/shared"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"

interface ProductDetailsTableProps {
	id?: ParamId
	readonly?: boolean
}

const ProductDetailsTable: FC<ProductDetailsTableProps> = ({
	id,
	readonly
}) => {
	const {
		data: printDetails,
		isLoading,
		isFetching
	} = useGetProductsPrintDetailsByIdQuery(id)

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = useProductDetailsColumns()
	return (
		<>
			<Table<PrintDetail>
				title={"Типы печати"}
				extra={
					readonly ? null : (
						<Button icon={<PlusOutlined />} onClick={toggleForm}>
							Добавить
						</Button>
					)
				}
				loading={isLoading || isFetching}
				columns={columns.filter((el) => (readonly ? el.key !== "actions" : el))}
				dataSource={printDetails?.data}
			/>
		</>
	)
}

export { ProductDetailsTable }
