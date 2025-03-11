import { PlusOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { Button } from "src/components/ui/button"
import { Table } from "src/components/ui/table"
import {
	PrintType,
	useGetPrintTypesQuery
} from "src/services/shared/print-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { usePrintTypesColumns } from "../hooks/use-print-types-columns"

const PrintTypesTable: FC = () => {
	const { data: printTypes, isLoading, isFetching } = useGetPrintTypesQuery({})

	const toggleForm = useFormDevtoolsStore((state) => state.toggleForm)

	const columns = usePrintTypesColumns()
	return (
		<>
			<Table<PrintType>
				rowKey={(record) => record.id}
				title={"Типы печати"}
				extra={
					<Button icon={<PlusOutlined />} onClick={toggleForm}>
						Добавить
					</Button>
				}
				loading={isLoading || isFetching}
				columns={columns}
				dataSource={printTypes?.data}
			/>
		</>
	)
}

export { PrintTypesTable }
