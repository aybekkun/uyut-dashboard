import { DescriptionsProps } from "antd"
import { ProductItem } from "src/services/products"
import { formatDate, formatEmpty, formatPrice } from "src/utils/formatter.utils"

const useProductItems = (data?: ProductItem) => {
	const items: DescriptionsProps["items"] = [
		{
			key: "Остаток длины",
			label: "Длина",
			children: formatEmpty(data?.remainder[0].meter)
		},
		{
			key: "remainder_square_meter",
			label: "Остаток площади",
			children: formatEmpty(data?.remainder[0].meter_square)
		},
		{
			key: "collar",
			label: "Цвет",
			children: formatEmpty(data?.collar?.name)
		},
		{
			key: "rolls",
			label: "Количество рулонов",
			children: formatEmpty(data?.total_rolls)
		},
		{
			key: "price_uzs",
			label: "Цена UZS",
			children: formatPrice(data?.total_price_uzs)
		},
		{
			key: "price_usd",
			label: "Цена USD",
			children: formatPrice(data?.total_price_usd)
		},

		{
			key: "created_at",
			label: "Создан",
			children: formatDate(data?.created_at)
		}
	]

	return items
}

export { useProductItems }
