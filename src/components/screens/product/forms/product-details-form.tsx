import { Form, FormProps, Select } from "antd"
import { type FC, useEffect } from "react"
import { FormDrawer } from "src/components/shared"
import { InputNumber, InputPrice } from "src/components/ui"
import { FORM_DEFAULT, SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { useCreateProductsPrintDetailsMutation } from "src/services/products"
import {
	type PrintDetail,
	type PrintDetailForm,
	useEditPrintDetailsMutation
} from "src/services/products/print-details"
import type { ParamId } from "src/services/shared"
import { useGetPrintTypesQuery } from "src/services/shared/print-types"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { isParamsFormValidate } from "src/utils/validate.utils"

interface ProductDetailsFormProps {
	id: ParamId
}

const ProductDetailsForm: FC<ProductDetailsFormProps> = ({ id }) => {
	const [form] = Form.useForm<PrintDetailForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const { data: printTypes } = useGetPrintTypesQuery({})

	const { mutate: addPrintDetail, isPending: addLoading } =
		useCreateProductsPrintDetailsMutation(id)

	const { mutate: editPrintDetail, isPending: editLoading } =
		useEditPrintDetailsMutation()

	const onFinish: FormProps<PrintDetailForm>["onFinish"] = (values) => {
		if (isParamsFormValidate<PrintDetail>(params)) {
			editPrintDetail(
				{
					...values,
					id: params.id
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
		addPrintDetail(values, {
			onSuccess: () => {
				resetParams()
				form.resetFields()
			}
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<PrintDetail>(params)) {
			form.setFieldsValue({
				...params,
				print_type_id: params?.print_type?.id
			})
		}
	}, [form, params])
	return (
		<FormDrawer width={350} form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"product-detail-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<PrintDetailForm>
					name={"print_type_id"}
					label={"Тип печати"}
					rules={[{ required: true }]}>
					<Select
						showSearch={true}
						placeholder={SELECT_PLACEHOLDER}
						optionFilterProp={"label"}
						options={printTypes?.data?.map((printType) => ({
							value: printType?.id,
							label: printType?.name
						}))}
					/>
				</Form.Item>
				<Form.Item<PrintDetailForm>
					name={"meter"}
					label={"Метр"}
					rules={[{ required: true }]}>
					<InputNumber />
				</Form.Item>
				<Form.Item<PrintDetailForm>
					name={"print_cost"}
					label={"Стоимость печати"}
					rules={[{ required: true }]}>
					<InputPrice />
				</Form.Item>
				<Form.Item<PrintDetailForm>
					name={"material_cost"}
					label={"Стоимость материала"}
					rules={[{ required: true }]}>
					<InputPrice />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { ProductDetailsForm }
