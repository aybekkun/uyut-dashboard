import {
	EyeOutlined,
	FileImageOutlined,
	QuestionCircleOutlined
} from "@ant-design/icons"
import { Avatar, Image, Popover, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { PrintDetailTable } from "src/components/shared/print-detail"
import type { SalesProduct } from "src/services/sales-products"
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useDebtorsColumns = () => {
	const columns: ColumnsType<SalesProduct> = [
		{
			title: "Клиент",
			dataIndex: ["client", "full_name"],
			key: "client",
			render: formatEmpty
		},
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
		}
	]

	return columns
}
