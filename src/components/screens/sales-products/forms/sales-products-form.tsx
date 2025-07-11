import {
	AutoComplete,
	Button,
	Col,
	Form,
	FormProps,
	Input,
	InputNumber,
	Row,
	Select,
	Space,
	Typography
} from "antd"
import { type FC, useMemo } from "react"
import { PatternFormat } from "react-number-format"

import { FormDrawer } from "src/components/shared/form-drawer"

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { InputPrice } from "src/components/ui"
import { FORM_DEFAULT, SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { useGetProductsQuery } from "src/services/products"
import {
	type SalesProductForm,
	useCreateSalesProductsMutation
} from "src/services/sales-products"
import { useGetClientsQuery } from "src/services/shared/clients"
import { useGetPrintTypesQuery } from "src/services/shared/print-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatPhone, formatPhoneReverse } from "src/utils/formatter.utils"
import { FormItemPaymentType } from "./form-items"

const { Text } = Typography
/* const clients = {
	data: [
		{
			id: 8,
			full_name: "f",
			phone: "+998 13 121 23 12"
		},
		{
			id: 9,
			full_name: "13",
			phone: "+998123123422"
		},
		{
			id: 10,
			full_name: "234",
			phone: "+998324242342"
		},
		{
			id: 11,
			full_name: "test",
			phone: "+998999999999"
		},
		{
			id: 12,
			full_name: "fwert",
			phone: "+998995995959"
		}
	]
} */
const SalesProductsForm: FC = () => {
	const [form] = Form.useForm<SalesProductForm>()
	const { t } = useTranslation()
	const { resetParams } = useFormDevtoolsStore()
	const { data: products } = useGetProductsQuery({})
	const { data: printTypes } = useGetPrintTypesQuery({})
	const { mutate: addSalesProduct, isPending: addLoading } =
		useCreateSalesProductsMutation()
	const { data: clients } = useGetClientsQuery({})

	// Watch form values for calculations
	const watchedValues = Form.useWatch([], form)
	const productsList = watchedValues?.products || []
	const handleClientSelect = (selectedName: string) => {
		const selectedClient = clients?.data?.find(
			(client) => client.full_name === selectedName
		)

		if (selectedClient) {
			form.setFieldValue("phone", formatPhone(selectedClient.phone))
		}
	}
	// Calculate total cost for each product
	const calculateProductTotal = (product: any) => {
		if (!product) return 0
		const printCost = parseFloat(product.print_cost || 0)
		const materialCost = parseFloat(product.material_cost || 0)
		return printCost + materialCost
	}

	// Calculate grand total
	const grandTotal = useMemo(() => {
		return productsList.reduce((sum: number, product: any) => {
			return sum + calculateProductTotal(product)
		}, 0)
	}, [productsList])

	// Get product info and calculate area
	const getProductInfo = (productId: number) => {
		const product = products?.data?.find((p) => p.id === productId)
		if (!product) return { hasWidth: false, width: 0, unitOfMeasurement: "м" }

		const productName = product.name.name
		const widthMatch = productName.match(/\d+\.?\d*/)
		const hasWidth = !!widthMatch
		const width = hasWidth ? parseFloat(widthMatch[0]) : 0

		return {
			hasWidth,
			width,
			unitOfMeasurement: hasWidth ? "м²" : "м"
		}
	}

	// Calculate area in m²
	const calculateArea = (productId: number, length: number) => {
		const { hasWidth, width } = getProductInfo(productId)
		return hasWidth ? width * length : 0
	}

	const onFinish: FormProps<SalesProductForm>["onFinish"] = async (values) => {
		await addSalesProduct(
			{ ...values, phone: formatPhoneReverse(values.phone) },
			{
				onSuccess: () => {
					resetParams()
					form.resetFields()
				}
			}
		)
	}

	return (
		<FormDrawer form={form} width={1000} isLoading={addLoading}>
			<Form
				{...FORM_DEFAULT}
				form={form}
				name={"sales-product-form"}
				onFinish={onFinish}>
				<FormItemPaymentType />
				<Row gutter={8}>
					<Col span={12}>
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
					<Col span={12}>
						<Form.Item<SalesProductForm>
							name={"phone"}
							label={t("phone_number")}
							rules={[{ required: true }]}>
							<PatternFormat format={"+998 ## ### ## ##"} customInput={Input} />
						</Form.Item>
					</Col>
				</Row>
				<Form.List name="products">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => {
								const currentProduct = productsList[name]
								const productId = currentProduct?.product_id
								const productInfo = productId
									? getProductInfo(productId)
									: { hasWidth: false, width: 0, unitOfMeasurement: "м" }
								const productTotal = calculateProductTotal(currentProduct)
								const length = currentProduct?.length || 0
								const area = calculateArea(productId, length)

								return (
									<div
										key={key}
										style={{
											border: "1px solid #d9d9d9",
											padding: "16px",
											marginBottom: "16px",
											borderRadius: "6px"
										}}>
										<Space
											style={{
												display: "flex",
												marginBottom: 8,
												flexWrap: "wrap"
											}}
											align="start">
											<Form.Item
												{...restField}
												label={t("product")}
												name={[name, "product_id"]}
												rules={[{ required: true, message: "Выберите товар" }]}>
												<Select
													placeholder={SELECT_PLACEHOLDER}
													showSearch={true}
													style={{ width: 180 }}
													optionFilterProp={"label"}
													options={products?.data?.map((item) => ({
														value: item.id,
														label: `${item.name.name} ${item.collar?.collar || ""}`
													}))}
												/>
											</Form.Item>
											<Form.Item
												{...restField}
												label={`${t("length")} (м)`}
												name={[name, "length"]}
												rules={[{ required: true, message: "Введите длину" }]}>
												<InputNumber placeholder="Длина в метрах" min={0} />
											</Form.Item>
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
													options={printTypes?.data?.map((item) => ({
														value: item.id,
														label: item.name
													}))}
												/>
											</Form.Item>

											<Form.Item
												{...restField}
												label={t("print_cost")}
												name={[name, "print_cost"]}
												rules={[{ required: true, message: "Введите цену" }]}>
												<InputPrice placeholder="Цена печати" />
											</Form.Item>

											<Form.Item
												{...restField}
												label={t("material_cost")}
												name={[name, "material_cost"]}
												rules={[{ required: true, message: "Введите цену" }]}>
												<InputPrice placeholder="Цена материала" />
											</Form.Item>

											<MinusCircleOutlined
												onClick={() => remove(name)}
												style={{ marginTop: "30px", color: "#ff4d4f" }}
											/>
										</Space>

										{/* Display product details and total */}
										{productTotal > 0 && (
											<div style={{ marginTop: "8px", textAlign: "right" }}>
												{productInfo.hasWidth && area > 0 && (
													<div style={{ marginBottom: "4px" }}>
														<Text>
															{t("meter_square")}: {area.toFixed(2)} м² (
															{t("width")}: {productInfo.width}м × {t("length")}
															: {length}м)
														</Text>
													</div>
												)}
												<Text strong={true} style={{ fontSize: "16px" }}>
													{t("total_cost")}: {productTotal.toLocaleString()} UZS
												</Text>
											</div>
										)}
									</div>
								)
							})}

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

				{/* Grand Total */}
				{grandTotal > 0 && (
					<div
						style={{
							marginTop: "24px",
							padding: "16px",
							backgroundColor: "#f5f5f5",
							borderRadius: "6px",
							textAlign: "right"
						}}>
						<Text style={{ fontSize: "20px", color: "#1890ff" }}>
							{t("total_cost")}: {grandTotal.toLocaleString()} USZ
						</Text>
					</div>
				)}
			</Form>
		</FormDrawer>
	)
}

export { SalesProductsForm }
