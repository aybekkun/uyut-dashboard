import {
	DeleteFilled,
	EditFilled,
	EyeOutlined,
	FileImageOutlined,
	QuestionCircleOutlined
} from "@ant-design/icons"
import { Avatar, Image, Popover, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { ClientTable } from "src/components/shared/client"
import { PrintDetailTable } from "src/components/shared/print-detail"
import { Button } from "src/components/ui/button"
import {
	type SalesProduct,
	useDeleteSalesProductsMutation
} from "src/services/sales-products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useSalesProductsColumns = () => {
	const { mutate: deleteSalesProduct } = useDeleteSalesProductsMutation()

	const editSalesProduct = useFormDevtoolsStore((state) => state.setParams)

	const columns: ColumnsType<SalesProduct> = [
		{
			title: "Товар",
			dataIndex: ["product", "name"],
			key: "product",
			render: formatEmpty
		},
		{
			title: "Длина",
			dataIndex: "length",
			key: "length",
			render: formatEmpty
		},
		{
			title: "Тип печати",
			dataIndex: "print_detail",
			key: "length",
			render: (value?: SalesProduct["print_detail"]) => {
				const [printDetail] = value || []
				if (!printDetail) return "-"
				return (
					<Space>
						{formatEmpty(printDetail?.print_type?.name)}
						<Popover content={<PrintDetailTable data={value} />}>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: "Общая стоимость",
			dataIndex: "total_cost",
			key: "total_cost",
			render: formatPriceUZS
		},
		{
			title: "Общая площадь",
			dataIndex: "total_meter_square",
			key: "total_meter_square",
			render: formatEmpty
		},
		{
			title: "Способ оплаты",
			dataIndex: ["payment_type", "name"],
			key: "payment_type",
			render: formatEmpty
		},
		{
			title: "Клиент",
			dataIndex: ["client"],
			key: "client",
			// render: formatEmpty
			render: (value?: SalesProduct["client"]) => {
				return (
					<Space>
						{formatEmpty(value?.full_name)}
						<Popover content={<ClientTable data={value} />}>
							<QuestionCircleOutlined style={{ cursor: "pointer" }} />
						</Popover>
					</Space>
				)
			}
		},
		{
			title: "Файл",
			dataIndex: "file",
			key: "file",
			render: (value: string) => (
				<Avatar
					shape={"square"}
					src={
						<Image
							preview={{
								mask: <EyeOutlined />
							}}
							loading={"lazy"}
							src={value}
							alt={""}
						/>
					}
					icon={<FileImageOutlined />}
					alt={""}
				/>
			)
		},
		{
			title: "Создано",
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		},
		{
			width: 100,
			fixed: "right",
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editSalesProduct(record)}
						tooltip={"Изменить"}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.product?.name,
							onConfirm: () => deleteSalesProduct(record?.id)
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
