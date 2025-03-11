import { Form, type FormProps, Select } from "antd"
import { type FC, useEffect } from "react"
import { PatternFormat } from "react-number-format"
import { FormDrawer } from "src/components/shared/form-drawer"
import { Input } from "src/components/ui/input"
import { InputPassword } from "src/components/ui/input-password"
import { FORM_DEFAULT, SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { useGetRolesQuery } from "src/services/shared/roles"
import {
	useCreateUsersMutation,
	useEditUsersMutation,
	User,
	type UserForm
} from "src/services/users"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { formatPhoneForm, formatPhoneReverse } from "src/utils/formatter.utils"
import { isParamsFormValidate } from "src/utils/validate.utils"

const UsersForm: FC = () => {
	const [form] = Form.useForm<UserForm>()

	const { params, resetParams } = useFormDevtoolsStore()

	const {
		data: roles,
		isLoading: rolesLoading,
		isFetching: rolesFetching
	} = useGetRolesQuery()

	const { mutate: addUser, isPending: addLoading } = useCreateUsersMutation()
	const { mutate: editUser, isPending: editLoading } = useEditUsersMutation()

	const onReset = () => {
		resetParams()
		form.resetFields()
	}

	const onFinish: FormProps<UserForm>["onFinish"] = async (values) => {
		if (values.phone) {
			values.phone = formatPhoneReverse(values.phone)
		}
		if (isParamsFormValidate<User>(params)) {
			editUser(
				{
					...values,
					id: params.id
				},
				{
					onSuccess: onReset
				}
			)
			return
		}
		addUser(values, {
			onSuccess: onReset
		})
	}

	useEffect(() => {
		if (isParamsFormValidate<User>(params)) {
			form.setFieldsValue({
				...params,
				phone: formatPhoneForm(params?.phone),
				role_id: params.role.id
			})
		}
	}, [form, params])
	return (
		<FormDrawer form={form} isLoading={addLoading || editLoading}>
			<Form
				{...FORM_DEFAULT}
				name={"user-form"}
				form={form}
				onFinish={onFinish}>
				<Form.Item<UserForm>
					name={"name"}
					label={"ФИО"}
					rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item<UserForm>
					name={"phone"}
					label={"Телефон номер"}
					rules={[{ required: true }]}
					initialValue={""}>
					<PatternFormat format={"+998 ## ### ## ##"} customInput={Input} />
				</Form.Item>
				<Form.Item<UserForm>
					name={"role_id"}
					label={"Роль"}
					rules={[{ required: true }]}>
					<Select
						placeholder={SELECT_PLACEHOLDER}
						loading={rolesLoading || rolesFetching}
						showSearch={true}
						optionFilterProp={"label"}
						options={roles?.data?.map((role) => ({
							value: role.id,
							label: role.name
						}))}
					/>
				</Form.Item>
				<Form.Item<UserForm>
					name={"password"}
					label={"Пароль"}
					rules={[{ required: !params }]}>
					<InputPassword />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}

export { UsersForm }
