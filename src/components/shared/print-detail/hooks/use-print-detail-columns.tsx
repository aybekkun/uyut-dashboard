import { ColumnsType } from "antd/es/table"
import type { PrintDetail } from "src/services/products/print-details"
import { formatEmpty, formatPrice } from "src/utils/formatter.utils"

const usePrintDetailColumns = () => {
	const columns: ColumnsType<PrintDetail> = [
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
			render: formatPrice
		},
		{
			title: "Стоимость материала",
			dataIndex: "material_cost",
			key: "material_cost",
			render: formatPrice
		}
	]

	return columns
}

export { usePrintDetailColumns }
