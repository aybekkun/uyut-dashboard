import { DescriptionsProps } from "antd"
import { useTranslation } from "react-i18next"
import { ProductItem } from "src/services/products"
import { formatEmpty, formatPrice } from "src/utils/formatter.utils"

const useProductItems = (data?: ProductItem) => {
	const { t } = useTranslation()
	const items: DescriptionsProps["items"] = [
		{
			key: "remainder_length",
			label: t("length"),
			children: formatEmpty(data?.remainder.meter)
		},
		{
			key: "remainder_area",
			label: t("remainder_area"),
			children: formatEmpty(data?.remainder.meter_square)
		},
		{
			key: "color",
			label: t("color"),
			children: formatEmpty(data?.collar?.collar)
		},
		{
			key: "number_of_rolls",
			label: t("number_of_rolls"),
			children: formatEmpty(data?.total_rolls)
		},
		{
			key: "price_uzs",
			label: t("price_uzs"),
			children: formatPrice(data?.total_price_uzs)
		},
		{
			key: "price_usd",
			label: t("price_usd"),
			children: formatPrice(data?.total_price_usd)
		}
	]

	return items
}

export { useProductItems }
