import {
	AutoComplete,
	Button,
	Card,
	Col,
	Form,
	Input,
	Row,
	Select,
	Space,
	Typography
} from "antd"
import { FormProps } from "antd/lib"
import { type FC } from "react"
import { PatternFormat } from "react-number-format"
import { FORM_DEFAULT } from "src/constants/form.constants"
import {
	SalesProductForm,
	useCreateSalesProductsMutation
} from "src/services/sales-products"
import { formatPhoneReverse, formatPriceUZS } from "src/utils/formatter.utils"

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { InputPrice } from "src/components/ui"
import { SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { useGetProductsQuery } from "src/services/products"
import { useGetClientsQuery } from "src/services/shared/clients"
import { useGetPrintTypesQuery } from "src/services/shared/print-types"
import { formatPhone } from "src/utils/formatter.utils"
import { FormItemPaymentType } from "./form-items"

const { Text } = Typography

interface Props {
	className?: string
}

interface ProductInfo {
	sellPrice: number
	hasWidth: boolean
	width: number
	unitOfMeasurement: string
	shouldShowPrintType: boolean
	maxValue: number
}

export const SalesProduct: FC<Props> = ({ className = `` }) => {
	const { t } = useTranslation()
	const [form] = Form.useForm<SalesProductForm>()

	// API queries
	const { data: clients } = useGetClientsQuery({})
	const { data: products } = useGetProductsQuery({})
	const { data: printTypes } = useGetPrintTypesQuery({})
	const { mutate: addSalesProduct, isPending: addLoading } =
		useCreateSalesProductsMutation()

	const watchedValues = Form.useWatch([], form)
	const productsList = watchedValues?.products || []

	// Обработчик выбора клиента
	const handleClientSelect = (selectedName: string) => {
		const selectedClient = clients?.data?.find(
			(client) => client.full_name === selectedName
		)

		if (selectedClient) {
			form.setFieldValue("phone", formatPhone(selectedClient.phone))
		}
	}

	// Получение информации о продукте
	const getProductInfo = (productId: number): ProductInfo => {
		const product = products?.data?.find((p) => p.id === productId)

		if (!product) {
			return {
				hasWidth: false,
				width: 0,
				unitOfMeasurement: "м",
				shouldShowPrintType: true,
				sellPrice: 0,
				maxValue: 0
			}
		}

		const hasWidth = !!product.width
		const width = product.width ? product.width : 0
		const sellPrice = parseFloat(product.sell_price)
		const maxValue = hasWidth
			? product.remainder.meter_square
			: product.remainder.meter

		const shouldShowPrintType = !(
			product.name.id === 2 || product.name.id === 4
		)

		return {
			sellPrice,
			hasWidth,
			width,
			maxValue: maxValue ?? 0,
			unitOfMeasurement: hasWidth ? "м²" : "м",
			shouldShowPrintType
		}
	}

	const onFinish: FormProps<SalesProductForm>["onFinish"] = async (values) => {
		// Обрабатываем продукты перед отправкой
		const processedProducts =
			values.products?.map((product) => {
				const productInfo = getProductInfo(product.product_id)

				// Если товар не имеет ширины, удаляем поля связанные с печатью
				if (!productInfo.hasWidth) {
					const {
						print_type_id,
						print_meter_square,
						print_cost,
						...productWithoutPrint
					} = product
					return productWithoutPrint
				}

				return product
			}) || []

		const processedValues = {
			...values,
			phone: formatPhoneReverse(values.phone),
			products: processedProducts
		}

		await addSalesProduct(processedValues, {
			onSuccess: () => {
				form.resetFields()
			}
		})
	}
	const calculateArea = (productId: number, length?: number) => {
		const productInfo = getProductInfo(productId)

		if (productInfo.width && length) {
			return productInfo.width * length
		}
		if (length) return length
		return 0
	}
	const getPrintTypeCost = (printTypeId?: number) => {
		if (printTypeId) {
			const printType = printTypes?.data?.find(
				(item) => item.id === printTypeId
			)
			return parseFloat(printType?.amount ?? "0")
		}
		return 0
	}
	const handleChangePrintType = (index: number, printTypeId: number) => {
		const printCost = getPrintTypeCost(printTypeId)
		const meterSquare = form.getFieldValue([
			"products",
			index,
			"print_meter_square"
		])
		if (meterSquare) {
			form.setFieldValue(
				["products", index, "print_cost"],
				printCost * meterSquare
			)
		} else {
			form.setFieldValue(["products", index, "print_cost"], printCost)
		}
	}
	const clearPrintFields = (productIndex: number) => {
		const fieldsToReset = [
			["products", productIndex, "print_meter_square"],
			["products", productIndex, "print_type_id"],
			["products", productIndex, "print_cost"]
		]

		fieldsToReset.forEach((field) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			form.setFieldValue(field, undefined)
		})
	}
	const handleChangeMeterSquare = (index: number, meterSquare: number) => {
		const printTypeId = form.getFieldValue(["products", index, "print_type_id"])
		const printCost = getPrintTypeCost(printTypeId)
		if (meterSquare) {
			form.setFieldValue(
				["products", index, "print_cost"],
				printCost * meterSquare
			)
		} else {
			form.setFieldValue(["products", index, "print_cost"], printCost)
		}
	}
	const handleChangePrintMeterSquare = (index: number, productId: number) => {
		const length = form.getFieldValue(["products", index, "length"]) ?? 0
		const product = getProductInfo(productId)
		const area = calculateArea(productId, length)

		if (length) {
			const materialCost = product.sellPrice * area
			form.setFieldValue(["products", index, "material_cost"], materialCost)
		}
	}
	const handleChangeLength = (index: number, productId: number) => {
		const length = form.getFieldValue(["products", index, "length"]) ?? 0
		const product = getProductInfo(productId)
		const area = calculateArea(productId, length)
		if (!length) {
			form.setFieldValue(["products", index, "material_cost"], 0)
		}
		if (length) {
			const materialCost = product.sellPrice * area
			form.setFieldValue(["products", index, "material_cost"], materialCost)
		}
	}

	const calculateRowPrice = (index: number) => {
		const materialCost =
			form.getFieldValue(["products", index, "material_cost"]) ?? 0
		const printCost = form.getFieldValue(["products", index, "print_cost"]) ?? 0
		return (materialCost + printCost).toFixed(2)
	}
	// Опции для селекта продуктов
	const productOptions =
		products?.data?.map((item) => ({
			value: item.id,
			label: `${item.name.name} ${item.collar?.collar || ""}`
		})) || []

	return (
		<Card className={className}>
			<Form
				form={form}
				onFinish={onFinish}
				{...FORM_DEFAULT}
				name={"sales-product-form"}>
				{/* Информация о клиенте */}
				<Row gutter={8} style={{ width: "100%" }} align={"middle"}>
					<Col span={8}>
						<Form.Item<SalesProductForm>
							name={"full_name"}
							label={t("fio")}
							rules={[{ required: true, message: "Введите ФИО" }]}>
							<AutoComplete
								showSearch={true}
								notFoundContent={null}
								placeholder={SELECT_PLACEHOLDER}
								onSelect={(value) => handleClientSelect(value)}
								options={clients?.data?.map((item) => ({
									value: item.full_name,
									label: item.full_name
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item<SalesProductForm>
							name={"phone"}
							label={t("phone_number")}
							rules={[{ required: true }]}>
							<PatternFormat format={"+998 ## ### ## ##"} customInput={Input} />
						</Form.Item>
					</Col>
					<Col span={6}>
						<FormItemPaymentType />
					</Col>
				</Row>

				{/* Список продуктов */}
				<Form.List name="products">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => {
								const currentProduct = productsList[name]
								const productId = currentProduct?.product_id
								const productInfo = getProductInfo(productId)
								const area = calculateArea(productId, currentProduct?.length)
								const printCost = getPrintTypeCost(
									currentProduct?.print_type_id
								)
								const price = calculateRowPrice(name)

								return (
									<div key={key}>
										<Space
											style={{
												display: "flex",
												gap: 20,
												alignItems: "flex-start"
											}}>
											{/* Выбор продукта */}
											<Form.Item
												{...restField}
												label="Товары"
												name={[name, "product_id"]}
												rules={[{ required: true, message: "Выберите товар" }]}>
												<Select
													placeholder={SELECT_PLACEHOLDER}
													showSearch={true}
													style={{ width: "220px" }}
													onChange={(value) => {
														clearPrintFields(name)
														handleChangePrintMeterSquare(name, value)
													}}
													optionFilterProp="label"
													options={productOptions}
												/>
											</Form.Item>

											{/* Длина */}
											<Form.Item
												{...restField}
												label={`${t("length")}(м)`}
												name={[name, "length"]}>
												<InputPrice
													onChange={() => handleChangeLength(name, productId)}
													placeholder="Длина в метрах"
													min={0}
												/>
											</Form.Item>

											{/* Площадь печати (только для продуктов с шириной) */}
											{productInfo.hasWidth && (
												<Form.Item
													{...restField}
													label={`${t("meter_square")}(м2)`}
													name={[name, "print_meter_square"]}
													rules={[
														{ required: true, message: "Введите площадь" },
														{
															validator: (_, value) => {
																if (value && value > area) {
																	return Promise.reject(
																		new Error(`Максимум ${area}`)
																	)
																}
																return Promise.resolve()
															}
														}
													]}>
													<InputPrice
														onChange={(value) =>
															handleChangeMeterSquare(name, value as number)
														}
														min={0}
														placeholder="Площадь в м²"
													/>
												</Form.Item>
											)}

											{/* Тип печати (только для продуктов с шириной) */}
											{productInfo.hasWidth && (
												<Form.Item
													{...restField}
													label={t("print_type")}
													name={[name, "print_type_id"]}
													rules={[
														{ required: true, message: "Введите принт тип" }
													]}>
													<Select
														placeholder={SELECT_PLACEHOLDER}
														optionFilterProp={"label"}
														style={{ width: 120 }}
														onChange={(value) =>
															handleChangePrintType(name, value)
														}
														options={printTypes?.data?.map((item) => ({
															value: item.id,
															label: item.name
														}))}
													/>
												</Form.Item>
											)}
											{productInfo.hasWidth && (
												<Form.Item
													{...restField}
													label={t("print_cost")}
													name={[name, "print_cost"]}
													rules={[{ required: true, message: "Введите цену" }]}>
													<InputPrice placeholder="Цена печати" />
												</Form.Item>
											)}
											<Form.Item
												{...restField}
												label={t("material_cost")}
												name={[name, "material_cost"]}
												rules={[{ required: true, message: "Введите цену" }]}>
												<InputPrice
													precision={3}
													step={0.1}
													placeholder={
														productInfo.sellPrice === 0
															? "Введите цену вручную"
															: "Цена материала"
													}
												/>
											</Form.Item>
											<Button
												type="text"
												danger={true}
												style={{ marginTop: 30 }}
												icon={<DeleteOutlined />}
												onClick={() => remove(name)}
											/>
										</Space>
										<Row>
											<Col span={3}>
												<Text strong style={{ display: "block" }}>
													Ед.измерение:
												</Text>
												<Text>{productInfo.unitOfMeasurement}</Text>
											</Col>
											<Col span={3}>
												<Text strong style={{ display: "block" }}>
													Цена за метр:
												</Text>
												<Text>{formatPriceUZS(productInfo.sellPrice)}</Text>
											</Col>
											<Col span={3}>
												<Text strong style={{ display: "block" }}>
													{productInfo.hasWidth ? "Площадь" : "Длина"}:
												</Text>
												<Text strong style={{ display: "block" }}>
													{area.toFixed(2)} {productInfo.unitOfMeasurement}
												</Text>
												{area > productInfo.maxValue && (
													<Text strong style={{ color: "red" }}>
														Максимальная {productInfo.maxValue}{" "}
													</Text>
												)}
											</Col>
											<Col span={3}>
												<Text strong style={{ display: "block" }}>
													Цена принта:
												</Text>
												<Text>{formatPriceUZS(printCost)}</Text>
											</Col>
											<Col span={3}>
												<Text
													strong
													style={{ display: "block", color: "blue" }}>
													Общая цена:
												</Text>
												<Text>{formatPriceUZS(price)}</Text>
											</Col>
										</Row>
									</div>
								)
							})}

							{/* Кнопка добавления продукта */}
							<Form.Item>
								<Button
									onClick={() => add()}
									block={true}
									icon={<PlusOutlined />}>
									{t("add")}
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>

				{/* Кнопка сохранения */}
				<Form.Item label={null}>
					<Button
						type="primary"
						htmlType="submit"
						block={true}
						loading={addLoading}>
						Сохранить
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}
