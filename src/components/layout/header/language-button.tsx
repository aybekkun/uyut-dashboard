import { type FC } from "react"
import { Select } from "antd"
import { useTranslation } from "react-i18next"

const LanguageButton: FC = () => {
	const { i18n } = useTranslation()

	const languages = [
		{ label: "UZ", value: "uz" },
		{ label: "RU", value: "ru" },
		{ label: "KAA", value: "kaa" },
		{ label: "EN", value: "en" }
	]

	return (
		<Select
			value={i18n.language}
			onChange={(val) => i18n.changeLanguage(val)}
			options={languages}
			style={{ width: 70 }}
		/>
	)
}

export { LanguageButton }
