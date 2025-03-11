import { Col, Form, FormInstance, InputNumber, Row } from "antd"
import { type FC } from "react"
import { INPUT_PLACEHOLDER } from "src/constants/form.constants"
// import { useConvertPrice } from "src/hooks/use-convert-price"
import type { ProductForm } from "src/services/products"
import { formatInputPrice } from "src/utils/formatter.utils"

interface FormItemPriceProps {
	form: FormInstance<ProductForm>
}

const FormItemPrice: FC<FormItemPriceProps> = () => {
	// const priceUZS = Form.useWatch("price_uzs", form) || 0
	// const priceUSD = Form.useWatch("price_usd", form) || 0

	// const convertedPriceUZStoUSD = useConvertPrice(Number(priceUZS), "USD", "UZS")
	// const convertedPriceUSDtoUZS = useConvertPrice(Number(priceUSD), "UZS", "USD")
	//
	// const onConvertPrices = () => {
	// 	form.setFieldValue("price_uzs", convertedPriceUSDtoUZS)
	// 	form.setFieldValue("price_usd", convertedPriceUZStoUSD)
	// }

	// useDebounce(
	// 	() => {
	// 		form.setFieldValue("price_usd", convertedPriceUZStoUSD)
	// 	},
	// 	500,
	// 	[priceUZS, convertedPriceUZStoUSD]
	// )
	//
	// useDebounce(
	// 	() => {
	// 		form.setFieldValue("price_uzs", convertedPriceUSDtoUZS)
	// 	},
	// 	500,
	// 	[priceUSD, convertedPriceUSDtoUZS]
	// )

	// console.log("UZS to USD", convertedPriceUZStoUSD)
	// console.log("USD to UZS", convertedPriceUSDtoUZS)

	// useEffect(() => {
	// 	form.setFieldValue("price_usd", convertedPriceUZStoUSD)
	// }, [convertedPriceUZStoUSD, form])
	//

	// useEffect(() => {
	// 	form.setFieldsValue({
	// 		price_uzs: convertedPriceUSDtoUZS,
	// 		price_usd: convertedPriceUZStoUSD
	// 	})
	// }, [priceUSD, priceUZS, form])
	return (
		<Row gutter={20} style={{ rowGap: 20 }}>
			<Col span={12}>
				<Form.Item<ProductForm>
					name={"price_uzs"}
					label={"UZS"}
					rules={[{ required: true }]}>
					<InputNumber
						formatter={formatInputPrice}
						style={{ width: "100%" }}
						placeholder={INPUT_PLACEHOLDER}
					/>
				</Form.Item>
			</Col>
			{/*<Col span={4}>*/}
			{/*	<Flex align={"baseline"} style={{ height: "100%" }}>*/}
			{/*		<Button tooltip={"Конвертировать"} icon={<PercentageOutlined />} />*/}
			{/*	</Flex>*/}
			{/*</Col>*/}
			<Col span={12}>
				<Form.Item<ProductForm>
					name={"price_usd"}
					label={"USD"}
					rules={[{ required: true }]}>
					<InputNumber
						formatter={formatInputPrice}
						style={{ width: "100%" }}
						placeholder={INPUT_PLACEHOLDER}
					/>
				</Form.Item>
			</Col>
		</Row>
	)
}

export { FormItemPrice }
