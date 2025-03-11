import { DescriptionsProps } from "antd"
import { Product } from "src/services/products"
import { formatDate, formatEmpty, formatPrice } from "src/utils/formatter.utils"

const useProductItems = (data?: Product) => {
	const items: DescriptionsProps["items"] = [
		{
			key: "length",
			label: "Длина",
			children: formatEmpty(data?.length)
		},
		{
			key: "width",
			label: "Ширина",
			children: formatEmpty(data?.width)
		},
		{
			key: "meter_square",
			label: "Площадь",
			children: formatEmpty(data?.meter_square)
		},
		{
			key: "remainder_square_meter",
			label: "Остаток площади",
			children: formatEmpty(data?.remainder_square_meter)
		},
		{
			key: "price_uzs",
			label: "Цена UZS",
			children: formatPrice(data?.price_uzs)
		},
		{
			key: "price_usd",
			label: "Цена USD",
			children: formatPrice(data?.price_usd)
		},
		{
			key: "supplier",
			label: "Поставщик",
			children: formatEmpty(data?.supplier?.name)
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
