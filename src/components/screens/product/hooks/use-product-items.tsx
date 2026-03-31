import { Button, DescriptionsProps, Form } from "antd"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { InputPrice } from "src/components/ui"
import { ProductItem, useUpdateProductPrice } from "src/services/products"
import {
	formatEmpty,
	formatPriceUSD,
	formatPriceUZS
} from "src/utils/formatter.utils"

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
			key: "remainder_pieces",
			label: t("remainder_pieces"),
			children: formatEmpty(data?.remainder.pieces)
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
			label: "UZS",
			children: formatPriceUZS(data?.total_price_uzs)
		},
		{
			key: "price_usd",
			label: "USD",
			children: formatPriceUSD(data?.total_price_usd)
		},
		{
			key: "measurement_unit",
			label: t("measurement_unit"),
			children: data?.measurement_unit.name
		},
		{
			key: "buy_price",
			label: t("buy_price"),
			children: (
				<UpdatePriceForm
					productId={data?.id}
					initialPrice={data?.buy_price}
					type="buy_price"
				/>
			)
		},
		{
			key: "sell_price",
			label: t("sell_price"),
			children: (
				<UpdatePriceForm
					productId={data?.id}
					initialPrice={data?.sell_price}
					type="sell_price"
				/>
			)
		}
	]

	return items
}

export const UpdatePriceForm = ({
	productId,
	initialPrice,
	type
}: {
	productId?: number
	initialPrice?: string
	type: "sell_price" | "buy_price"
}) => {
	const [form] = Form.useForm()
	const { t } = useTranslation()
	const { mutate, isPending } = useUpdateProductPrice()
	useEffect(() => {
		if (initialPrice) form.setFieldValue("price", initialPrice)
	}, [initialPrice, productId, form])
	const onFinish = (values: { price: string }) => {
		if (productId) mutate({ id: productId, [type]: values.price })
	}

	return (
		<Form form={form} layout="inline" onFinish={onFinish}>
			<Form.Item
				name="price"
				rules={[{ required: true, message: t("enter_price") }]}>
				<InputPrice />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={isPending}>
					{t("edit")}
				</Button>
			</Form.Item>
		</Form>
	)
}

export { useProductItems }
