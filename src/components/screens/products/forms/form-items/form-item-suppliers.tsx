import { Form, Select } from "antd"
import { type FC, useState } from "react"
import { useDebounce } from "react-use"
import { SELECT_PLACEHOLDER } from "src/constants/form.constants"
import { ProductForm } from "src/services/products"
import { useGetSuppliersQuery } from "src/services/suppliers"

const FormItemSuppliers: FC = () => {
	const [searchValue, setSearchValue] = useState("")
	const [search, setSearch] = useState("")
	useDebounce(
		() => {
			setSearch(searchValue)
		},
		500,
		[searchValue]
	)

	const {
		data: suppliers,
		isLoading,
		isFetching
	} = useGetSuppliersQuery({
		search
	})

	return (
		<Form.Item<ProductForm>
			name={"supplier_id"}
			label={"Поставщик"}
			rules={[{ required: true }]}>
			<Select
				placeholder={SELECT_PLACEHOLDER}
				loading={isLoading || isFetching}
				showSearch={true}
				optionFilterProp={"label"}
				onSearch={setSearchValue}
				options={suppliers?.data?.map((supplier) => ({
					value: supplier.id,
					label: supplier.name
				}))}
			/>
		</Form.Item>
	)
}

export { FormItemSuppliers }
