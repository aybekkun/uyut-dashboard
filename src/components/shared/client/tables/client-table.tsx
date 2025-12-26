import { type FC } from "react"
import { Table } from "src/components/ui/table"
import type { Client } from "src/services/shared/clients"
import { useClientColumns } from "../hooks/use-client-columns"
import { useTranslation } from "react-i18next"

interface ClientTableProps {
	data?: Client
}

const ClientTable: FC<ClientTableProps> = ({ data }) => {
	const { t } = useTranslation()
	const columns = useClientColumns()
	return (
		<>
			<Table<Client>
				rowKey={(record) => record.id}
				title={data ? data?.full_name : t("client")}
				columns={columns}
				size={"small"}
				dataSource={data ? [data] : []}
				pagination={false}
			/>
		</>
	)
}

export { ClientTable }
