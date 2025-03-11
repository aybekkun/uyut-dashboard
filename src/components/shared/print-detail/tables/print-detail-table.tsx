import { type FC } from "react"
import { Table } from "src/components/ui/table"
import type { PrintDetail } from "src/services/products/print-details"
import { usePrintDetailColumns } from "../hooks/use-print-detail-columns"

interface PrintDetailTableProps {
	data?: PrintDetail[]
}

const PrintDetailTable: FC<PrintDetailTableProps> = ({ data }) => {
	const columns = usePrintDetailColumns()
	return (
		<>
			<Table<PrintDetail>
				title={data?.[0]?.print_type?.name || "Тип печати"}
				size={"small"}
				rowKey={(record) => record.id}
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
		</>
	)
}

export { PrintDetailTable }
