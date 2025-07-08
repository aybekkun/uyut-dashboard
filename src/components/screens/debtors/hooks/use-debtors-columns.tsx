import { EyeOutlined, FileImageOutlined } from "@ant-design/icons"
import { Avatar, Image } from "antd"
import { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import type { SalesProduct } from "src/services/sales-products"
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useDebtorsColumns = () => {
	const { t } = useTranslation()
	const columns: ColumnsType<SalesProduct> = [
		{
			title: t("client"),
			dataIndex: ["client", "full_name"],
			key: "client",
			render: formatEmpty
		},
		{
			title: t("product"),
			dataIndex: ["product", "name"],
			key: "product",
			render: formatEmpty
		},
		{
			title: t("length"),
			dataIndex: "length",
			key: "length",
			render: formatEmpty
		},
		// {
		// 	title: t("print_type"),
		// 	dataIndex: "print_detail",
		// 	key: "print_detail",
		// 	render: (value?: SalesProduct["print_detail"]) => {
		// 		const [printDetail] = value || []
		// 		if (!printDetail) return "-"
		// 		return (
		// 			<Space>
		// 				{formatEmpty(printDetail?.print_type?.name)}
		// 				<Popover content={<PrintDetailTable data={value} />}>
		// 					<QuestionCircleOutlined style={{ cursor: "pointer" }} />
		// 				</Popover>
		// 			</Space>
		// 		)
		// 	}
		// },
		{
			title: t("total_cost"),
			dataIndex: "total_cost",
			key: "total_cost",
			render: formatPriceUZS
		},
		{
			title: t("total_area"),
			dataIndex: "total_meter_square",
			key: "total_meter_square",
			render: formatEmpty
		},
		{
			title: t("payment_method"),
			dataIndex: ["payment_type", "name"],
			key: "payment_type",
			render: formatEmpty
		},
		{
			title: t("file"),
			dataIndex: "file",
			key: "file",
			render: (value: string) => (
				<Avatar
					shape={"square"}
					src={
						<Image
							preview={{ mask: <EyeOutlined /> }}
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
			title: t("created"),
			dataIndex: "created_at",
			key: "created_at",
			render: formatDate
		}
	]
	return columns
}
