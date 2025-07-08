import { ArrowLeftOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { Card, Descriptions, Spin } from "antd"
import { type FC } from "react"
import { useTranslation } from "react-i18next"
import { useProductItems } from "src/components/screens/product"
import { Button } from "src/components/ui"
import { ProductItem } from "src/services/products"

interface ProductDescriptionProps {
	id?: number | string
	data: ProductItem | undefined
	isLoading?: boolean
	isFetching?: boolean
}

const ProductDescription: FC<ProductDescriptionProps> = ({
	data: product,
	isFetching,
	isLoading
}) => {
	const { t } = useTranslation()
	const router = useRouter()

	const items = useProductItems(product)

	return (
		<Card
			bordered={false}
			title={`${t("product")}: ${product?.name?.name}`}
			extra={
				<Button
					icon={<ArrowLeftOutlined />}
					onClick={() => router.history.back()}>
					{t("back")}
				</Button>
			}>
			<Spin spinning={isLoading || isFetching}>
				<Descriptions layout={"vertical"} items={items} />
			</Spin>
		</Card>
	)
}

export { ProductDescription }
