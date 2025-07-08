import {
	Button,
	Col,
	Form,
	FormProps,
	Input,
	InputNumber,
	Row,
	Select,
	Space
} from "antd"
import { type FC } from "react"
import { PatternFormat } from "react-number-format"

import { FormDrawer } from "src/components/shared/form-drawer"

import { FORM_DEFAULT, SELECT_PLACEHOLDER } from "src/constants/form.constants"
import {
	type SalesProductForm,
	useCreateSalesProductsMutation
} from "src/services/sales-products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { FormItemPaymentType } from "./form-items"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useGetProductsQuery } from "src/services/products"
import { useGetPrintTypesQuery } from "src/services/shared/print-types"
import { InputPrice } from "src/components/ui"
import { useTranslation } from "react-i18next"

const SalesProductsForm: FC = () => {
	const [form] = Form.useForm<SalesProductForm>()
	const { t } = useTranslation()
	const { resetParams } = useFormDevtoolsStore()
	const { data: products } = useGetProductsQuery({})
	const { data: printTypes } = useGetPrintTypesQuery({})
	const { mutate: addSalesProduct, isPending: addLoading } =
		useCreateSalesProductsMutation()

	const onFinish: FormProps<SalesProductForm>["onFinish"] = async (values) => {
		await addSalesProduct(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	return (
		<FormDrawer form={form} width={700} isLoading={addLoading}>
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
							rules={[{ required: true }]}>
							<Input />
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
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{
										display: "flex",
										marginBottom: 8
									}}
									align="start">
									<Form.Item
										{...restField}
										label={t("product")}
										name={[name, "product_id"]}
										rules={[{ required: true, message: "Выберите товар" }]}>
										<Select
											placeholder={SELECT_PLACEHOLDER}
											/* showSearch={true} */
											style={{ width: 120 }}
											optionFilterProp={"label"}
											/* onSearch={setSearchValue} */
											options={products?.data?.map((item) => ({
												value: item.id,
												label: item.name.name
											}))}
										/>
									</Form.Item>

									<Form.Item
										{...restField}
										label={t("print_type")}
										name={[name, "print_type_id"]}
										rules={[{ required: true, message: "Введите принт тип" }]}>
										<Select
											placeholder={SELECT_PLACEHOLDER}
											/* showSearch={true} */
											optionFilterProp={"label"}
											style={{ width: 120 }}
											/* onSearch={setSearchValue} */
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

									<Form.Item
										{...restField}
										label={t("length")}
										name={[name, "length"]}
										rules={[{ required: true, message: "Введите длину" }]}>
										<InputNumber placeholder="length" />
									</Form.Item>

									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}

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
			</Form>
		</FormDrawer>
	)
}

export { SalesProductsForm }
