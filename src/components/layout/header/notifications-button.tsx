import { type FC, useMemo } from "react"
import { Button } from "src/components/ui"
import { BellOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { useGetDebtorsQuery } from "src/services/debtors"
import { DebtorsNotificationContainer } from "./notifications-container"

const DebtorsBell: FC = () => {
  const { data } = useGetDebtorsQuery({})
  const today = dayjs().format("YYYY-MM-DD")

  const todayDebtors = useMemo(
    () => data?.data?.filter((d) => d.due_date === today) || [],
    [data, today]
  )

  return (
    <DebtorsNotificationContainer count={todayDebtors.length} debtors={todayDebtors}>
      <Button
        type="text"
        icon={<BellOutlined style={{ fontSize: 20 }} />}
      />
    </DebtorsNotificationContainer>
  )
}

export { DebtorsBell }
