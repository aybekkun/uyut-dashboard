import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"
import { formatDate, formatPriceUZS } from "src/utils/formatter.utils"

interface Transaction {
    paid_amount: string
    created_at: string
}

export const TransactionsTable = ({ data }: { data: Transaction[] }) => {
    const {t} = useTranslation()
    const columns: ColumnsType<Transaction> = [
        {
            title: t("paid_amount"),
            dataIndex: "paid_amount",
            key: "paid_amount",
            render: (val: string) => formatPriceUZS(val)
        },
        {
            title: t("date"),
            dataIndex: "created_at",
            key: "created_at",
            render: formatDate
        }
    ]

    return <Table columns={columns} dataSource={data} rowKey="created_at" pagination={false} />
}
