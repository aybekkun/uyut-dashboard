import { PlusOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import {
	type PaymentType,
	useGetPaymentTypesQuery
} from "src/services/shared/payment-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { usePaymentTypesColumns } from "../hooks/use-payment-types-columns"

const PaymentTypesTable: FC = () => {
	const {
		data: printTypes,
		isLoading,
		isFetching
	} = useGetPaymentTypesQuery({})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = usePaymentTypesColumns()
	return (
		<>
			<Table<PaymentType>
				rowKey={(record) => record.id}
				title={"Типы оплаты"}
				extra={
					<Button icon={<PlusOutlined />} onClick={toggleForm}>
						Добавить
					</Button>
				}
				loading={isLoading || isFetching}
				columns={columns}
				dataSource={printTypes?.data}
			/>
		</>
	)
}

export { PaymentTypesTable }
