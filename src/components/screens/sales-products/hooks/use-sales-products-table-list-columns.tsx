import { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { SalesProduct } from "src/services/sales-products"
import { formatEmpty, formatPrice } from "src/utils/formatter.utils"

export const useSalesProductsTableListColumns = () => {
    const { t } = useTranslation()
    const columns: ColumnsType<SalesProduct["products"]> = [
        {
            title: t("name"),
            dataIndex: ["product", "name"],
            key: "name",
            render: formatEmpty
        },
        {
            title: t("print_type"),
            dataIndex: ["print_type", "name"],
            key: "print_type",
            render: formatEmpty
        },
        {
            title: t("printPrice"),
            dataIndex: "print_cost",
            key: "print_cost",
            render: formatPrice
        },
        {
            title: t("material_cost"),
            dataIndex: "material_cost",
            key: "material_cost",
            render: formatPrice
        },
        {
            title: t("meter_square"),
            dataIndex: "meter_square",
            key: "meter_square",
            render: formatEmpty
        },
        {
            title: t("length"),
            dataIndex: "meter",
            key: "meter",
            render: formatEmpty
        },
        {
            title: t("pieces"),
            dataIndex: "pieces",
            key: "pieces",
            render: formatEmpty
        },
        {
            title: t("total_cost"),
            dataIndex: "amount",
            key: "amount",
            render: formatPrice
        }
    ]
    return columns
}
