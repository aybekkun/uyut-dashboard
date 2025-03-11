import dayjs from "dayjs"

export const formatPhone = (phone?: string) => {
	return phone
		? phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
		: "-"
}

export const formatPhoneReverse = (phone?: string) => {
	if (phone === undefined) return "-"
	if (phone.startsWith("+998")) {
		return phone.replace(/ /g, "")
	}
	return "+998" + phone.replace(/ /g, "")
}

export const formatPhoneForm = (phone?: string) => {
	return phone ? phone.replace("+998", "") : ""
}

export const formatEmpty = <T>(value?: T) => value ?? "-"

export const formatMetre = <T>(value?: T) => (value ?? "0") + " m"

export const formatInputPrice = <T>(value: T) =>
	`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")

export const formatPrice = <T>(value?: T): string => {
	if (value === undefined || isNaN(Number(value))) {
		return "0"
	}
	return Intl.NumberFormat("ru-RU", {}).format(Number(value))
}

export const formatPriceUZS = <T>(value?: T): string => {
	if (value === undefined || isNaN(Number(value))) {
		return "0"
	}
	return Intl.NumberFormat("ru-RU", {}).format(Number(value)) + " UZS"
}

export const formatPriceUSD = <T>(value?: T): string => {
	if (value === undefined || isNaN(Number(value))) {
		return "0"
	}
	return Intl.NumberFormat("ru-RU", {}).format(Number(value)) + " USD"
}

export const formatDate = <T extends dayjs.ConfigType>(value?: T): string =>
	dayjs(value).format("DD.MM.YYYY")

export const formatFormDate = <T extends dayjs.ConfigType>(value?: T): string =>
	dayjs(value).format("YYYY-MM-DD")

export const formatDateTransform = <T extends dayjs.ConfigType>(
	value?: T,
	format?: string
): string => dayjs(value).format(format || "DD.MM.YYYY")
