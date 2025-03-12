import { type FC } from "react"

import { Radio, Space } from "antd"
import { useTranslation } from "react-i18next"

const LanguageButton: FC = () => {
	const { i18n } = useTranslation()
	return (
		<>
			<Space>
				<Radio.Group
					value={i18n.language}
					onChange={(e) => i18n.changeLanguage(e.target.value)}>
					<Radio.Button value={"uz"}>UZ</Radio.Button>
					<Radio.Button value={"ru"}>RU</Radio.Button>
				</Radio.Group>
			</Space>
		</>
	)
}

export { LanguageButton }
