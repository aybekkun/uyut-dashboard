import { DatePicker } from "antd"
import dayjs from "dayjs"
import { Debtor, useUpdateDueDateMutation } from "src/services/debtors"

export const UseDebtorsColumnDueDatePicker = ({ record }: { record: Debtor }) => {
    const update = useUpdateDueDateMutation()

    const dateValue = record.due_date ? dayjs(record.due_date) : null

    const handleChange = (newDate: dayjs.Dayjs | null) => {
        const formattedDate = newDate ? newDate.format("YYYY-MM-DD") : null
        update.mutate({ id: record.id, due_date: formattedDate })
    }

    return (
        <DatePicker
            value={dateValue}
            onChange={handleChange}
            format="YYYY-MM-DD"
        />
    )
}