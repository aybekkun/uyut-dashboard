import { Badge, Divider, Flex, List, Popover, Typography, Tag } from "antd"
import { type FC, type PropsWithChildren, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "src/components/ui"
import { Debtor } from "src/services/debtors"
import { formatPhone, formatPriceUZS } from "src/utils/formatter.utils"

interface Props extends PropsWithChildren {
    count: number
    debtors: Debtor[]
}

const DebtorsNotificationContainer: FC<Props> = ({ children, count, debtors }) => {
    const [open, setOpen] = useState(false)
    const { t } = useTranslation()
    const { Title, Text } = Typography

    return (
        <Popover
            trigger="click"
            arrow={false}
            open={open}
            onOpenChange={setOpen}
            placement="bottomRight"
            styles={{ body: { width: 420, padding: 12 } }}
            content={
                <Flex vertical gap={12}>
                    <Title
                        style={{
                            textAlign: "center",
                            margin: 0,
                            fontWeight: 600,
                            color: "#444"
                        }}
                        level={4}
                    >
                        {t("overdue_debtors")}
                    </Title>

                    <List
                        size="small"
                        dataSource={debtors}
                        locale={{ emptyText: t("no_debtors") }}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                style={{
                                    padding: "12px 8px",
                                    borderRadius: 8,
                                    background: "#fafafa",
                                    marginBottom: 8
                                }}
                            >
                                <Flex vertical gap={4}>
                                    <Text type="secondary">
                                        {t("client")}: <Text strong>{item.client.full_name}</Text>
                                    </Text>
                                    <Text type="secondary">
                                        {t("phone_number")}: <Text>{formatPhone(item.client.phone)}</Text>
                                    </Text>
                                    <Text>
                                        {t("owed_amount")}:{" "}
                                        <Tag color="red">{formatPriceUZS(item.owed_amount)}</Tag>
                                    </Text>
                                    <Text type="secondary">
                                        {t("due_date")}: {item.due_date}
                                    </Text>
                                </Flex>
                            </List.Item>
                        )}
                    />

                    <Divider style={{ margin: "8px 0" }} />

                    <Button block type="primary" onClick={() => setOpen(false)}>
                        {t("close")}
                    </Button>
                </Flex>
            }
        >
            <Badge count={count} color="red" offset={[-2, 6]}>
                {children}
            </Badge>
        </Popover>
    )
}

export { DebtorsNotificationContainer }
