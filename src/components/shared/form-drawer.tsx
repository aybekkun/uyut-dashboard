import { PlusCircleOutlined } from "@ant-design/icons"
import { Drawer, DrawerProps, Flex, FormInstance, Space } from "antd"
import { type FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "src/components/ui/button"
import { useFormDevtoolsStore } from "src/store/use-form-devtools-store"
import { useShallow } from "zustand/react/shallow"

interface FormDrawerProps extends DrawerProps {
	form: FormInstance
	isLoading: boolean
}

const FormDrawer: FC<FormDrawerProps> = ({
	isLoading,
	form,
	children,
	...rest
}) => {
	const { t } = useTranslation()
	const { isForm, resetParams, params } = useFormDevtoolsStore(
		useShallow((state) => state)
	)

	const onCloseDrawer = () => {
		resetParams()
		form.resetFields()
	}

	return (
		<>
			<Drawer
				keyboard={false}
				closeIcon={<PlusCircleOutlined />}
				open={isForm}
				title={params ? t("edit") : t("add")}
				onClose={onCloseDrawer}
				placement={"right"}
				width={300}
				{...rest}
				footer={
					<Flex justify={"end"}>
						<Space>
							<Button danger={true} onClick={onCloseDrawer}>
								{t("cancel")}
							</Button>
							<Button loading={isLoading} onClick={form.submit}>
								{t("save")}
							</Button>
						</Space>
					</Flex>
				}>
				{children}
			</Drawer>
		</>
	)
}

export { FormDrawer }
