import { Button, Col, Form, FormInstance, InputNumber, Row } from "antd"
import { type FC } from "react"
import { useTranslation } from "react-i18next"
// import { useConvertPrice } from "src/hooks/use-convert-price"
import type { ProductForm } from "src/services/products"
import { formatInputPrice } from "src/utils/formatter.utils"

interface FormItemPriceProps {
	form: FormInstance<ProductForm>
}

const FormItemPrice: FC<FormItemPriceProps> = ({ form }) => {

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
	const { t } = useTranslation()
	const increaseByPercent = (field: keyof ProductForm, percent: number) => {
		const current = form.getFieldValue(field) || 0
		const updated = current + (current * percent) / 100
		form.setFieldsValue({ [field]: updated })
	}

	return (
		<Row gutter={20} style={{ rowGap: 20, marginBottom: 40 }}>
			<Col span={12}>
				<Form.Item<ProductForm>
					name={"price_uzs"}
					label={"UZS"}
					rules={[{ required: true }]}>
					<InputNumber
						formatter={formatInputPrice}
						style={{ width: "100%" }}
						placeholder={t("input_placeholder")}
					/>
				</Form.Item>
				<Row gutter={[8, 8]} style={{ width: "100%" }}>
					{[25, 50, 75, 100].map((p) => (
						<Col span={6} key={p}>
							<Button
								size="small"
								style={{ width: "100%", fontSize: "10px", padding: "2px 0" }}
								onClick={() => increaseByPercent("price_uzs", p)}
							>
								+{p}%
							</Button>
						</Col>
					))}
				</Row>


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
						placeholder={t("input_placeholder")}
					/>
				</Form.Item>
				<Row gutter={[8, 8]} style={{ width: "100%" }}>
					{[25, 50, 75, 100].map((p) => (
						<Col span={6} key={p}>
							<Button
								size="small"
								style={{ width: "100%", fontSize: "10px", padding: "2px 0" }}
								onClick={() => increaseByPercent("price_usd", p)}
							>
								+{p}%
							</Button>
						</Col>
					))}
				</Row>
			</Col>
		</Row>
	)
}

export { FormItemPrice }
