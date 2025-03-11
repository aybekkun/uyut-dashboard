import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type PriceRate = {
	rates: {
		UZS: number
		USD: number
	}
}

type PriceType = "UZS" | "USD"

const getLatestPriceRate = async (type?: PriceType): Promise<PriceRate> => {
	const response = await axios.get(
		`https://api.exchangerate-api.com/v4/latest/${type}`
	)
	return response.data
}

export const useConvertPrice = (
	price: number,
	fromType: PriceType,
	toType: PriceType
) => {
	const { data: priceRate } = useQuery({
		queryFn: () => getLatestPriceRate(fromType),
		queryKey: ["rate", price, fromType, toType]
	})

	if (!priceRate) {
		return 0
	}

	const rate = priceRate?.rates?.[toType]

	const converted = Number(price) / Number(rate)

	return converted.toFixed(2)
}
