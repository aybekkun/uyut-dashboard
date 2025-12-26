import {
	AutoComplete,
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Space,
	Typography
} from "antd"
import { FormProps } from "antd/lib"
import { useEffect, useMemo, type FC } from "react"
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
	measurementUnitId: number
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
	const paymentType = Form.useWatch<number | undefined>("payment_type_id", form)

	useEffect(() => {
		if (paymentType !== 2 && paymentType !== 4) {
			form.setFieldsValue({ due_date: undefined, paid_amount: undefined })
		}
		if (paymentType === 2) {
			form.setFieldsValue({ paid_amount: undefined })
		}
	}, [paymentType, form])

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
				unitOfMeasurement: "-",
				measurementUnitId: 1,
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

		const unitOfMeasurement = product.measurement_unit.name
		const measurementUnitId = product.measurement_unit.id

		const shouldShowPrintType = !(
			product.name.id === 2 || product.name.id === 4
		)

		return {
			sellPrice,
			hasWidth,
			width,
			maxValue: maxValue ?? 0,
			unitOfMeasurement,
			measurementUnitId,
			shouldShowPrintType
		}
	}

	const onFinish: FormProps<any>["onFinish"] = async (values) => {
		const processedProducts =
			values.products?.map((product: any) => {
				const productInfo = getProductInfo(product.product_id)
				if (!productInfo.hasWidth) {
					const { print_type_id, print_meter_square, print_cost, ...rest } = product
					return rest
				}
				return product
			}) || []

		const formatDate = (dateObj: any) => {
			if (!dateObj) return undefined
			const d = dateObj.toDate()
			const year = d.getFullYear()
			const month = String(d.getMonth() + 1).padStart(2, "0")
			const day = String(d.getDate()).padStart(2, "0")
			return `${year}-${month}-${day}`
		}

		const processedValues: SalesProductForm = {
			...values,
			phone: formatPhoneReverse(values.phone),
			products: processedProducts,
			paid_amount: values.paid_amount ?? 0,
			...(values.payment_type_id === 2 || values.payment_type_id === 4
				? { due_date: formatDate(values.due_date) }
				: {}), // ← добавляем только если нужно
		}

		await addSalesProduct(processedValues, { onSuccess: () => form.resetFields() })
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
	const handleChangeQuantity = (index: number, productId: number) => {
		const product = getProductInfo(productId)
		const length = form.getFieldValue(["products", index, "length"]) ?? 0
		const pieces = form.getFieldValue(["products", index, "pieces"]) ?? 0

		let materialCost = 0

		if (product.measurementUnitId === 3) {
			// Штуки
			materialCost = product.sellPrice * pieces
		} else if (product.measurementUnitId === 1) {
			// Метр квадратный → учитываем площадь
			const area = calculateArea(productId, length)
			materialCost = product.sellPrice * area
		} else {
			// Метр
			materialCost = product.sellPrice * length
		}

		form.setFieldValue(["products", index, "material_cost"], materialCost)
	}



	/* const handleChangeLength = (index: number, productId: number) => {
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
	} */

	const onAddGarfon = (index: number, productId: number) => {
		const length = form.getFieldValue(["products", index, "length"]) ?? 0
		const product = getProductInfo(productId)
		const garfon = getProductInfo(93)

		const perimetr = 2 * (length + product.width)
		const price = perimetr * garfon.sellPrice
		form.setFieldValue(["products", index + 1, "length"], perimetr)
		form.setFieldValue(["products", index + 1, "product_id"], 93)
		form.setFieldValue(["products", index + 1, "material_cost"], price)
	}

	const calculateRowPrice = (index: number) => {
		const materialCost =
			form.getFieldValue(["products", index, "material_cost"]) ?? 0
		const printCost = form.getFieldValue(["products", index, "print_cost"]) ?? 0
		return (materialCost + printCost).toFixed(2)
	}

	const calculateProductTotal = (product: any) => {
		if (!product) return 0
		const printCost = parseFloat(product.print_cost || 0)
		const materialCost = parseFloat(product.material_cost || 0)
		return printCost + materialCost
	}

	const grandTotal = useMemo(() => {
		return productsList.reduce((sum: number, product: any) => {
			return sum + calculateProductTotal(product)
		}, 0)
	}, [productsList])

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
								placeholder={t("select_placeholder")}
								onSelect={(value) => handleClientSelect(value)}
								options={clients?.data?.map((item) => ({
									key: item.id,
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
												label={t("products")}
												name={[name, "product_id"]}
												rules={[{ required: true, message: "Выберите товар" }]}>
												<Select
													placeholder={t("select_placeholder")}
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
											{productInfo.measurementUnitId === 3 ? (
												<Form.Item
													{...restField}
													label={"Штук материал"}
													name={[name, "pieces"]}
													rules={[{ required: true, message: "Введите количество штук" }]}
												>
													<InputPrice
														min={0}
														placeholder={"Введите количество штук"}
														onChange={() => handleChangeQuantity(name, productId)}
													/>
												</Form.Item>

											) : (
												<Form.Item
													{...restField}
													label={`${t("length")}(м)`}
													name={[name, "length"]}
												>
													<InputPrice
														onChange={() => handleChangeQuantity(name, productId)}
														placeholder="Длина в метрах"
														min={0}
													/>
												</Form.Item>

											)}


											{/* Площадь печати (только для продуктов с шириной) */}
											{productInfo.hasWidth && (
												<Form.Item
													{...restField}
													label={`${t("meter_square")}(м²)`}
													name={[name, "print_meter_square"]}
													rules={[
														{ required: true, message: "Введите площадь" },
														{
															validator: (_, value) => {
																// округляем оба значения до 2 знаков
																const roundedArea = Number(area?.toFixed(2) || 0)
																const roundedValue = Number((value ?? 0).toFixed(2))

																if (roundedValue > roundedArea) {
																	return Promise.reject(
																		new Error(`Максимум ${roundedArea}`)
																	)
																}
																return Promise.resolve()
															}
														}
													]}
												>
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
														placeholder={t("select_placeholder")}
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
											{productInfo.hasWidth && (
												<Button
													style={{ marginTop: 30 }}
													icon={<PlusOutlined />}
													onClick={async () => {
														await add()
														onAddGarfon(name, productId)
													}}>
													Гарфон
												</Button>
											)}
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
													{t("unitOfMeasurement")}:
												</Text>
												<Text>{productInfo.unitOfMeasurement}</Text>
											</Col>

											<Col span={3}>
												<Text strong style={{ display: "block" }}>
													{productInfo.measurementUnitId === 3
														? t("pricePerPiece")
														: productInfo.measurementUnitId === 2
															? t("pricePerMeter")
															: t("pricePerMeter")}
													:
												</Text>
												<Text>{formatPriceUZS(productInfo.sellPrice)}</Text>
											</Col>


											<Col span={3}>
												<Text strong style={{ display: "block" }}>
													{productInfo.hasWidth
														? t("area")
														: productInfo.measurementUnitId === 3
															? t("pieces")
															: t("length")}
													:
												</Text>

												<Text strong style={{ display: "block" }}>
													{productInfo.measurementUnitId === 3
														? (currentProduct?.pieces || 0)
														: area.toFixed(2)}{" "}
													{productInfo.unitOfMeasurement}
												</Text>

												{productInfo.hasWidth && area > productInfo.maxValue && (
													<Text strong style={{ color: "red" }}>
														{t("maxValue")} {productInfo.maxValue}
													</Text>
												)}
											</Col>


											<Col span={3}>
												<Text strong style={{ display: "block" }}>
													{t("printPrice")}:
												</Text>
												<Text>{formatPriceUZS(printCost)}</Text>
											</Col>

											<Col span={3}>
												<Text
													strong
													style={{ display: "block", color: "blue" }}>
													{t("totalPrice")}:
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
				{(paymentType === 2 || paymentType === 4) && (
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item
								name="due_date"
								label={t("due_date")}
								rules={[{ required: true, message: "Выберите дату" }]}
							>
								<DatePicker style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						{paymentType === 4 && (
							<Col span={12}>
								<Form.Item
									name="paid_amount"
									label={t("paid_amount")}
									rules={[{ required: true, message: "Введите сумму оплаты" }]}
								>
									<InputPrice
										precision={3}
										step={0.1}
										placeholder={t("input_placeholder")}
									/>
								</Form.Item>
							</Col>
						)}
					</Row>
				)}

				{grandTotal > 0 && (
					<div
						style={{
							marginTop: "24px",
							padding: "16px",
							backgroundColor: "transparent",
							borderRadius: "6px",
							textAlign: "right"
						}}>
						<Text strong style={{ fontSize: "20px", color: "blue" }}>
							{t("total_cost")}: {grandTotal.toLocaleString()} UZS
						</Text>
					</div>
				)}


				{/* Кнопка сохранения */}
				<Form.Item label={null}>
					<Button
						type="primary"
						htmlType="submit"
						block={true}
						loading={addLoading}>
						{t("save")}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}
