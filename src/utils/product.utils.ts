export const getProductMultiplier = (name: string) => {
	const match = name.match(/(\d+(\.\d+)?)/)
	return match ? parseFloat(match[1]) : 1
}

export const getProductUnit = (name: string, nameId: number) => {
	if (nameId === 2) return "м"
	const hasNumber = /\d/.test(name)
	if (hasNumber) return "м²"
	return "шт"
}

export const formatProductAmount = (
	amount: number | null | undefined,
	unit: string
) => {
	if (amount === null || amount === undefined) return "-"
	return `${amount} ${unit}`
}
