import { type FC } from "react"
import { Table } from "src/components/ui/table"
import type { Client } from "src/services/shared/clients"
import { useClientColumns } from "../hooks/use-client-columns"

interface ClientTableProps {
	data?: Client
}

const ClientTable: FC<ClientTableProps> = ({ data }) => {
	const columns = useClientColumns()
	return (
		<>
			<Table<Client>
				rowKey={(record) => record.id}
				title={data ? data?.full_name : "Клиент"}
				columns={columns}
				size={"small"}
				dataSource={data ? [data] : []}
				pagination={false}
			/>
		</>
	)
}

export { ClientTable }
