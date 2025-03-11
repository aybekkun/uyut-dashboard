import {
	DeleteFilled,
	EditFilled,
	QuestionCircleOutlined
} from "@ant-design/icons"
import { Popover, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { Button } from "src/components/ui/button"
import {
	useDeleteWriteOffProductsMutation,
	WriteOffProduct
} from "src/services/write-off-products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"
import { ProductMiniTable } from "../ui/product-mini-table"

export const useWriteOffProductsColumns = () => {
	const { mutate: deleteWriteOffProduct } = useDeleteWriteOffProductsMutation()

	const editWriteOffProduct = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<WriteOffProduct> = [
		{
			title: "Название",
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			title: "Товар",
			dataIndex: "product",
			key: "product",
			render: (value?: WriteOffProduct["product"]) => (
				<Space>
					{formatEmpty(value?.name)}
					<Popover content={<ProductMiniTable data={value} />}>
						<QuestionCircleOutlined style={{ cursor: "pointer" }} />
					</Popover>
				</Space>
			)
		},
		{
			title: "Длина",
			dataIndex: "length",
			key: "length",
			render: formatEmpty
		},
		{
			title: "Площадь",
			dataIndex: "meter_square",
			key: "meter_square",
			render: formatEmpty
		},
		{
			title: "Сумма",
			dataIndex: "amount",
			key: "amount",
			render: formatPriceUZS
		},
		{
			title: "Дата",
			dataIndex: "date",
			key: "date",
			render: formatDate
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editWriteOffProduct(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteWriteOffProduct(record?.id)
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
