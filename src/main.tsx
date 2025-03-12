import ReactDOM from "react-dom/client"
import { App } from "src/app"
import { Providers } from "src/providers/providers"
import "src/styles/app.css"
import "./i18n"
const rootElement = document.getElementById("app")!

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<Providers>
			<App />
		</Providers>
	)
}
