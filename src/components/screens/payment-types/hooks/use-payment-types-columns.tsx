import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import {
	PaymentType,
	useDeletePaymentTypesMutation
} from "src/services/shared/payment-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty } from "src/utils/formatter.utils"

const usePaymentTypesColumns = () => {
	const { mutate: deletePaymentType } = useDeletePaymentTypesMutation()

	const editPaymentType = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<PaymentType> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1
		},
		{
			title: "Название",
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editPaymentType(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record.name,
							onConfirm: () => deletePaymentType(record.id)
						}}
						tooltip={"Удалить"}
						danger={true}
						icon={<DeleteFilled />}
					/>
				</Space>
			)
		}
	]

	return columns
}

export { usePaymentTypesColumns }
