import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import { Supplier, useDeleteSuppliersMutation } from "src/services/suppliers"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty } from "src/utils/formatter.utils"

export const useSuppliersColumns = () => {
	const { mutate: deleteSupplier } = useDeleteSuppliersMutation()

	const editSupplier = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<Supplier> = [
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
						onClick={() => editSupplier(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteSupplier(record?.id)
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
