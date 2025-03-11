import { InboxOutlined } from "@ant-design/icons"
import { Col, Divider, Form, type FormProps, Row, Upload } from "antd"
import { UploadChangeParam, UploadFile } from "antd/es/upload"
import { type FC, useEffect } from "react"
import { PatternFormat } from "react-number-format"
import { FormDrawer } from "src/components/shared/form-drawer"
import { FormItemProducts } from "src/components/shared/form-items"
import { InputNumber } from "src/components/ui"
import { Input } from "src/components/ui/input"
import { FORM_DEFAULT } from "src/constants/form.constants"
import {
	SalesProduct,
	type SalesProductForm,
	useCreateSalesProductsMutation,
	useEditSalesProductsMutation
} from "src/services/sales-products"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatPhoneForm } from "src/utils/formatter.utils"
import { isParamsFormValidate } from "src/utils/validate.utils"
import { salesProductsFormData } from "../utils/sales-products-form-data"
import { FormItemPaymentType, FormItemPrintType } from "./form-items"

const SalesProductsForm: FC = () => {
	const [form] = Form.useForm<SalesProductForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { mutate: addSalesProduct, isPending: addLoading } =
		useCreateSalesProductsMutation()

	const { mutate: editSalesProduct, isPending: editLoading } =
		useEditSalesProductsMutation()

	const onFinish: FormProps<SalesProductForm>["onFinish"] = (values) => {
		const formData = salesProductsFormData(values)
		if (isParamsFormValidate<SalesProduct>(params)) {
			editSalesProduct(
				{
					formData,
					id: params?.id,
					client_id: params?.client?.id
				},
				{
					onSuccess: () => {
						resetParams()
						form.resetFields()
					}
				}
			)
			return
		}
		addSalesProduct(formData, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<SalesProduct>(params)) {
			form.setFieldsValue({
				...params,
				product_id: params?.product?.id,
				print_type_id: params?.print_detail?.[0]?.print_type?.id,
				payment_type_id: params?.payment_type?.id,
				full_name: params?.client?.full_name,
				phone: formatPhoneForm(params?.client?.phone),
				file: undefined
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} width={400} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				form={form}
				name={"sales-product-form"}
				onFinish={onFinish}>
				<FormItemProducts />
				<Form.Item<SalesProductForm>
					name={"length"}
					label={"Длина"}
					rules={[{ required: true }]}>
					<InputNumber />
				</Form.Item>
				<FormItemPrintType form={form} />
				<FormItemPaymentType />
				<Divider />
				<Form.Item label={"Клиент"}>
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item<SalesProductForm>
								name={"full_name"}
								label={"ФИО"}
								rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item<SalesProductForm>
								name={"phone"}
								label={"Телефон номер"}
								rules={[{ required: true }]}>
								<PatternFormat
									format={"+998 ## ### ## ##"}
									customInput={Input}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Divider />
					<Form.Item<SalesProductForm>
						name={"file"}
						valuePropName={"fileList"}
						getValueFromEvent={(e: UploadChangeParam<UploadFile>) => {
							if (Array.isArray(e)) {
								return e
							}
							return e?.fileList
						}}
						label={"Файл"}>
						<Upload.Dragger
							maxCount={1}
							accept={"image/*"}
							beforeUpload={() => false}
							listType={"picture"}>
							{/*<button style={{ border: 0, background: "none" }} type={"button"}>*/}
							{/*	<PlusOutlined />*/}
							{/*	<div style={{ marginTop: 8 }}>Upload</div>*/}
							{/*</button>*/}
							<p className={"ant-upload-drag-icon"}>
								<InboxOutlined />
							</p>
							<p className={"ant-upload-text"}>
								Нажмите или перетащите файл в эту область для загрузки
							</p>
						</Upload.Dragger>
					</Form.Item>
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { SalesProductsForm }
