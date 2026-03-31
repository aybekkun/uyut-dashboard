import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { Button } from "src/components/ui/button"
import {
	ProductsCollar,
	useDeleteProductsCollarMutation
} from "src/services/collar"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty } from "src/utils/formatter.utils"

const useProductsCollarColumns = () => {
	const { mutate: deleteProductsCollar } = useDeleteProductsCollarMutation()
	const editProductsCollar = useFormDevtoolsStore((state) => state.setParams)
	const { t } = useTranslation()

	const columns: ColumnsType<ProductsCollar> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1
		},
		{
			title: t("collar"),
			dataIndex: "collar",
			key: "collar",
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
						onClick={() => editProductsCollar(record)}
						tooltip={t("edit")}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.collar,
							onConfirm: () => deleteProductsCollar(record?.id)
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

export { useProductsCollarColumns }
