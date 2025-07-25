import {
	AppstoreAddOutlined,
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
	/* VerticalAlignBottomOutlined, */
	VerticalAlignMiddleOutlined,
	VerticalAlignTopOutlined
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { useTranslation } from "react-i18next"
import { ROUTES } from "src/config/routes.config"
export const useMenu = (): MenuProps["items"] => {
	const { t } = useTranslation()
	return [
		{ key: ROUTES.STORE_GROUP, type: "group", label: t("menu.store") },
		{
			key: ROUTES.STORE_PRODUCTS,
			icon: <ImportOutlined />,
			label: t("menu.store_list")
		},

		{ key: ROUTES.SALES_GROUP, type: "group", label: t("menu.sales") },
		{
			key: ROUTES.SALES_PRODUCTS,
			icon: <ExportOutlined />,
			label: t("menu.sales_list")
		},

		{ key: ROUTES.EMPLOYEES_GROUP, type: "group", label: t("menu.employees") },
		{
			key: ROUTES.EMPLOYEES_USERS,
			icon: <TeamOutlined />,
			label: t("menu.employees_list")
		},

		{ key: ROUTES.REPORT_GROUP, type: "group", label: t("menu.reports") },
		/* 	{
			key: ROUTES.REPORT_PRODUCTS,
			icon: <VerticalAlignBottomOutlined />,
			label: t("menu.report_income")
		}, */
		{
			key: ROUTES.REPORT_SUPPLIERS,
			icon: <UsergroupAddOutlined />,
			label: t("menu.report_suppliers")
		},
		{
			key: ROUTES.REPORT_SALES_PRODUCTS,
			icon: <VerticalAlignTopOutlined />,
			label: t("menu.report_sales")
		},
		{
			key: ROUTES.REPORT_EXPENSES,
			icon: <MinusSquareOutlined />,
			label: t("menu.report_expenses")
		},
		/* {
			key: ROUTES.REPORT_RECOMMENDED_ORDERS,
			icon: <CheckSquareOutlined />,
			label: t("menu.report_recommended_orders"),
			disabled: true
		}, */

		{
			key: ROUTES.REPORT_WRITE_OFF_PRODUCTS,
			icon: <VerticalAlignMiddleOutlined />,
			label: t("menu.report_write_off")
		},
		{
			key: ROUTES.REPORT_DEBTORS,
			icon: <UsergroupDeleteOutlined />,
			label: t("menu.report_debtors")
		},

		{ key: ROUTES.FINANCES_GROUP, type: "group", label: t("menu.finances") },
		{
			key: ROUTES.FINANCES_COMING_PRODUCTS,
			icon: <PlusCircleOutlined />,
			label: t("menu.finances_income")
		},
		{
			key: ROUTES.FINANCES_WRITE_OFF_PRODUCTS,
			icon: <MinusCircleOutlined />,
			label: t("menu.finances_write_off")
		},
		{
			key: ROUTES.FINANCES_SALE_PRODUCTS,
			icon: <DollarCircleOutlined />,
			label: t("menu.finances_sales")
		},
		{
			key: ROUTES.FINANCES_EXPENSES,
			icon: <ClockCircleOutlined />,
			label: t("menu.finances_expenses")
		},

		{ key: ROUTES.EXPENSES_GROUP, type: "group", label: t("menu.expenses") },
		{
			key: ROUTES.EXPENSES_LIST,
			icon: <UnorderedListOutlined />,
			label: t("menu.expenses_list")
		},
		/* 	{
			key: ROUTES.CASH_FLOW,
			icon: <UnorderedListOutlined />,
			label: t("menu.cash_flow")
		}, */
		/* 	{
			key: ROUTES.PROFIT_LOSE,
			icon: <UnorderedListOutlined />,
			label: t("menu.profit_lost")
		}, */
		{
			key: ROUTES.EXPENSES_WRITE_OFF_PRODUCTS,
			icon: <UnorderedListOutlined />,
			label: t("menu.expenses_write_off")
		},

		{ key: ROUTES.SETTINGS_GROUP, type: "group", label: t("menu.settings") },
		{
			key: ROUTES.SETTINGS_PRINT_TYPES,
			icon: <PrinterOutlined />,
			label: t("menu.settings_print_types")
		},
		{
			key: ROUTES.SETTINGS_PAYMENT_TYPES,
			icon: <MoneyCollectOutlined />,
			label: t("menu.settings_payment_types")
		},
		{
			key: ROUTES.SETTINGS_EXPENSE_TYPES,
			icon: <AppstoreAddOutlined />,
			label: t("menu.settings_expense_types")
		}
	]
}
