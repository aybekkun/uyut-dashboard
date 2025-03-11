class Routes {
	ROOT = "/"
	HOME = "/"
	PROFILE = "/profile"
	LOGIN = "/login"

	DASHBOARD = "/dashboard"

	STORE_GROUP = "/store"
	STORE_PRODUCTS = "/store/products"

	SALES_GROUP = "/sales"
	SALES_PRODUCTS = "/sales/products"

	EMPLOYEES_GROUP = "/employees"
	EMPLOYEES_USERS = "/employees/users"

	REPORT_GROUP = "/reports"
	REPORT_PRODUCTS = "/reports/products"
	REPORT_SALES_PRODUCTS = "/reports/sales-products"
	REPORT_WRITE_OFF_PRODUCTS = "/reports/write-off-products"
	REPORT_EXPENSES = "/reports/expenses"
	REPORT_RECOMMENDED_ORDERS = "/reports/orders"
	REPORT_SUPPLIERS = "/reports/suppliers"
	REPORT_DEBTORS = "/reports/debtors"

	FINANCES_GROUP = "/finances"
	FINANCES_COMING_PRODUCTS = "/finances/coming-products"
	FINANCES_SALE_PRODUCTS = "/finances/sale-products"
	FINANCES_WRITE_OFF_PRODUCTS = "/finances/write-off-products"
	FINANCES_EXPENSES = "/finances/expenses"

	EXPENSES_GROUP = "/expenses"
	EXPENSES_LIST = "/expenses/list"
	EXPENSES_WRITE_OFF_PRODUCTS = "/expenses/write-off-products"

	SETTINGS_GROUP = "/settings"
	SETTINGS_PRINT_TYPES = "/settings/print-types"
	SETTINGS_PAYMENT_TYPES = "/settings/payment-types"
	SETTINGS_EXPENSE_TYPES = "/settings/expense-types"
}

export const ROUTES = new Routes()
