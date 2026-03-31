import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Space, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { Button } from "src/components/ui/button"
import {
	ProductsName,
	useDeleteProductsNameMutation
} from "src/services/name"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatEmpty } from "src/utils/formatter.utils"

const useProductsNameColumns = () => {
	const { mutate: deleteProductsName } = useDeleteProductsNameMutation()
	const editProductsName = useFormDevtoolsStore((state) => state.setParams)
	const { t } = useTranslation()

	const columns: ColumnsType<ProductsName> = [
		{
			width: 50,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1
		},
		{
			title: t("name"),
			dataIndex: "name",
			key: "name",
			render: formatEmpty
		},
		{
			title: t("is_collar"),
			dataIndex: "is_collar",
			key: "is_collar",
			render: (value) => 
				value ? <Tag color="green">{t("yes")}</Tag> : <Tag color="red">{t("no")}</Tag>
		},
		{
			fixed: "right",
			width: 100,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space>
					<Button
						onClick={() => editProductsName(record)}
						tooltip={t("edit")}
						icon={<EditFilled />}
					/>
					<Button
						confirm={{
							title: record?.name,
							onConfirm: () => deleteProductsName(record?.id)
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

export { useProductsNameColumns }
