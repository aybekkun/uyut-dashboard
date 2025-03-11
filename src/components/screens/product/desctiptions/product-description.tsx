import { ArrowLeftOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { Card, Descriptions, Spin } from "antd"
import { type FC } from "react"
import { useProductItems } from "src/components/screens/product"
import { Button } from "src/components/ui"
import { useGetProductsByIdQuery } from "src/services/products"

interface ProductDescriptionProps {
	id?: number | string
}

const ProductDescription: FC<ProductDescriptionProps> = ({ id }) => {
	const router = useRouter()

	const { data: product, isLoading, isFetching } = useGetProductsByIdQuery(id)

	const items = useProductItems(product?.data)

	return (
		<Card
			bordered={false}
			title={`Товар: ${product?.data?.name}`}
			extra={
				<Button
					icon={<ArrowLeftOutlined />}
					onClick={() => router.history.back()}>
					Назад
				</Button>
			}>
			<Spin spinning={isLoading || isFetching}>
				<Descriptions layout={"vertical"} items={items} />
			</Spin>
		</Card>
	)
}

export { ProductDescription }
