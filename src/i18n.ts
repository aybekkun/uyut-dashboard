import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import translationUZ from "./locales/uz.json"
import translationRU from "./locales/ru.json"
i18n // Поддержка загрузки переводов (можно убрать, если локальные)
	.use(LanguageDetector) // Определение языка браузера
	.use(initReactI18next) // Интеграция с React
	.init({
		fallbackLng: "ru", // Язык по умолчанию
		debug: true,
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"]
		},
		resources: {
			uz: {
				translation: translationUZ
			},
			ru: {
				translation: translationRU
			}
		},
		interpolation: {
			escapeValue: false // React уже экранирует HTML
		}
	})

export default i18n
