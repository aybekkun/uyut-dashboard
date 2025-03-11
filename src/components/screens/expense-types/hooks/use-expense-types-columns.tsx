import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import {
	ExpenseType,
	useDeleteExpenseTypesMutation
} from "src/services/shared/expense-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty } from "src/utils/formatter.utils"

const useExpenseTypesColumns = () => {
	const { mutate: deleteExpenseType } = useDeleteExpenseTypesMutation()
	const editExpenseType = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<ExpenseType> = [
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
						onClick={() => editExpenseType(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteExpenseType(record?.id)
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

export { useExpenseTypesColumns }
