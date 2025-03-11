import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui"
import {
	PrintDetail,
	useDeletePrintDetailsMutation
} from "src/services/products/print-details"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty, formatPriceUZS } from "src/utils/formatter.utils"

const useProductDetailsColumns = () => {
	const { mutate: deletePrintDetail } = useDeletePrintDetailsMutation()

	const editPrintDetail = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<PrintDetail> = [
		{
			title: "Название",
			dataIndex: ["print_type", "name"],
			key: "print_type",
			render: formatEmpty
		},
		{
			title: "Метр",
			dataIndex: "meter",
			key: "meter",
			render: formatEmpty
		},
		{
			title: "Стоимость печати",
			dataIndex: "print_cost",
			key: "print_cost",
			render: formatPriceUZS
		},
		{
			title: "Стоимость материала",
			dataIndex: "material_cost",
			key: "material_cost",
			render: formatPriceUZS
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editPrintDetail(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.print_type?.name,
							onConfirm: () => deletePrintDetail(record?.id)
						}}
						tooltip={"Удалить"}
						icon={<DeleteFilled />}
						danger={true}
					/>
				</Space>
			)
		}
	]

	return columns
}

export { useProductDetailsColumns }
