import { DeleteFilled } from "@ant-design/icons"
import { Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { Button } from "src/components/ui/button"
import {
	useDeleteWriteOffProductsMutation,
	WriteOffProduct
} from "src/services/write-off-products"
/* import { useFormDevtoolsStore } from "src/store/use-form-devtools-store" */
import {
	formatDate,
	formatEmpty,
	formatPriceUZS
} from "src/utils/formatter.utils"

export const useWriteOffProductsColumns = (): ColumnsType<WriteOffProduct> => {
	const { t } = useTranslation()
	const { mutate: deleteWriteOffProduct } = useDeleteWriteOffProductsMutation()

	const columns: ColumnsType<WriteOffProduct> = [
		{
			title: t("name"),
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			title: t("product"),
			dataIndex: ["product", "name", "name"],
			key: "product"
		},
		{
			title: t("length"),
			dataIndex: "meter",
			key: "meter",
			render: formatEmpty
		},
		{
			title: t("total_area"),
			dataIndex: "meter_square",
			key: "meter_square",
			render: formatEmpty
		},
		{
			title: t("amount"),
			dataIndex: "amount",
			key: "amount",
			render: formatPriceUZS
		},
		{
			title: t("date"),
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
					{/* <Button
						onClick={() => editWriteOffProduct(record)}
						tooltip={t("edit")}
						icon={<EditFilled />}
					/> */}
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteWriteOffProduct(record?.id)
						}}
						tooltip={t("delete")}
						danger={true}
						icon={<DeleteFilled />}
					/>
				</Space>
			)
		}
	]

	return columns
}
