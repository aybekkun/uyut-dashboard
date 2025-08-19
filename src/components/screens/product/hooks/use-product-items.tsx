import { Button, DescriptionsProps, Form } from "antd"
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
			key: "sell_price",
			label: "Сотув нархи",
			children: (
				<UpdatePriceForm productId={data?.id} initialPrice={data?.sell_price} />
			)
		}
	]

	return items
}

export const UpdatePriceForm = ({
	productId,
	initialPrice
}: {
	productId?: number
	initialPrice?: string
}) => {
	const [form] = Form.useForm()
	const { mutate, isPending } = useUpdateProductPrice()

	const onFinish = (values: { price: string }) => {
		if (productId) mutate({ id: productId, sell_price: values.price })
	}

	return (
		<Form
			form={form}
			layout="inline"
			initialValues={{ price: initialPrice }}
			onFinish={onFinish}>
			<Form.Item
				name="price"
				rules={[{ required: true, message: "Введите цену" }]}>
				<InputPrice />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={isPending}>
					Изменить
				</Button>
			</Form.Item>
		</Form>
	)
}

export { useProductItems }
