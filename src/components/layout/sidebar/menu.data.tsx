import {
	AppstoreAddOutlined,
	CheckSquareOutlined,
	ClockCircleOutlined,
	DollarCircleOutlined,
	ExportOutlined,
	ImportOutlined,
	MinusCircleOutlined,
	MinusSquareOutlined,
	MoneyCollectOutlined,
	PlusCircleOutlined,
	PrinterOutlined,
	TeamOutlined,
	UnorderedListOutlined,
	UsergroupAddOutlined,
	UsergroupDeleteOutlined,
	VerticalAlignBottomOutlined,
	VerticalAlignMiddleOutlined,
	VerticalAlignTopOutlined
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { ROUTES } from "src/config/routes.config"

export const menu: MenuProps["items"] = [
	// {
	// 	key: ROUTES.HOME,
	// 	icon: <HomeOutlined />,
	// 	label: "Главная"
	// },
	// Печатник
	{
		key: ROUTES.STORE_GROUP,
		type: "group",
		label: "Склад"
	},
	{
		key: ROUTES.STORE_PRODUCTS,
		icon: <ImportOutlined />,
		label: "Список проходов"
	},

	// Дизайнер
	{
		key: ROUTES.SALES_GROUP,
		type: "group",
		label: "Продажи"
	},
	{
		key: ROUTES.SALES_PRODUCTS,
		icon: <ExportOutlined />,
		label: "Список продаж"
	},

	// Директор
	{
		key: ROUTES.EMPLOYEES_GROUP,
		type: "group",
		label: "Сотрудники"
	},
	{
		key: ROUTES.EMPLOYEES_USERS,
		icon: <TeamOutlined />,
		label: "Список сотрудников"
	},
	{
		key: ROUTES.REPORT_GROUP,
		type: "group",
		label: "Отчёты"
	},
	{
		key: ROUTES.REPORT_PRODUCTS,
		icon: <VerticalAlignBottomOutlined />,
		label: "Отчёт о поступлениях"
	},
	{
		key: ROUTES.REPORT_WRITE_OFF_PRODUCTS,
		icon: <VerticalAlignMiddleOutlined />,
		label: "Отчёт о списании"
	},
	{
		key: ROUTES.REPORT_SALES_PRODUCTS,
		icon: <VerticalAlignTopOutlined />,
		label: "Отчёт о продажах"
	},
	{
		key: ROUTES.REPORT_EXPENSES,
		icon: <MinusSquareOutlined />,
		label: "Отчёт о расходах"
	},
	{
		key: ROUTES.REPORT_RECOMMENDED_ORDERS,
		icon: <CheckSquareOutlined />,
		label: "Рекомендуемые заказы",
		disabled: true
	},
	{
		key: ROUTES.REPORT_SUPPLIERS,
		icon: <UsergroupAddOutlined />,
		label: "Поставщики"
	},
	{
		key: ROUTES.REPORT_DEBTORS,
		icon: <UsergroupDeleteOutlined />,
		label: "Должники"
	},
	{
		key: ROUTES.FINANCES_GROUP,
		type: "group",
		label: "Финансы"
	},
	{
		key: ROUTES.FINANCES_COMING_PRODUCTS,
		icon: <PlusCircleOutlined />,
		label: "Приходы"
	},
	{
		key: ROUTES.FINANCES_WRITE_OFF_PRODUCTS,
		icon: <MinusCircleOutlined />,
		label: "Списания"
	},
	{
		key: ROUTES.FINANCES_SALE_PRODUCTS,
		icon: <DollarCircleOutlined />,
		label: "Продажа"
	},
	{
		key: ROUTES.FINANCES_EXPENSES,
		icon: <ClockCircleOutlined />,
		label: "Расходы"
	},
	{
		key: ROUTES.EXPENSES_GROUP,
		type: "group",
		label: "Расходы"
	},
	{
		key: ROUTES.EXPENSES_LIST,
		icon: <UnorderedListOutlined />,
		label: "Список расходов"
	},
	{
		key: ROUTES.EXPENSES_WRITE_OFF_PRODUCTS,
		icon: <UnorderedListOutlined />,
		label: "Список списания"
	},
	{
		key: ROUTES.SETTINGS_GROUP,
		type: "group",
		label: "Настройки"
	},
	{
		key: ROUTES.SETTINGS_PRINT_TYPES,
		icon: <PrinterOutlined />,
		label: "Типы печати"
	},
	{
		key: ROUTES.SETTINGS_PAYMENT_TYPES,
		icon: <MoneyCollectOutlined />,
		label: "Типы оплаты"
	},
	{
		key: ROUTES.SETTINGS_EXPENSE_TYPES,
		icon: <AppstoreAddOutlined />,
		label: "Типы расходов"
	}
]
