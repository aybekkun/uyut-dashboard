import { AliasToken } from "antd/es/theme/interface"

const LIGHT_COLORS: Partial<AliasToken> & {
	colorTextMenu?: string
	colorTextSelectedMenu?: string
} = {
	colorBgLayout: "rgb(245, 246, 250)",
	colorPrimary: "rgb(30, 94, 255)",
	borderRadius: 4,
	boxShadowSecondary: "rgba(21, 34, 50, 0.08) 0px 1px 4px 0px",
	boxShadowTertiary: "rgba(103, 116, 142, 0.075) 0 0 16px 0",
	colorTextMenu: "rgb(90, 96, 127)",
	colorTextSelectedMenu: "rgb(255, 255, 255)"
}

const DARK_COLORS: Partial<AliasToken> & {
	colorTextMenu?: string
	colorTextSelectedMenu?: string
} = {
	// colorBgLayout: "rgb(0, 11, 21)",
	// colorBgContainer: "rgb(0, 21, 41)",
	// colorBgElevated: "rgb(0, 21, 41)",
	// colorBorder: "rgb(66, 76, 96)",
	// colorBorderSecondary: "rgb(66, 76, 96)",
	colorBgLayout: "rgb(10, 20, 28)",
	colorBgContainer: "rgb(33, 36, 61)",
	colorBgElevated: "rgb(33, 36, 61)",
	colorPrimary: "rgb(30, 94, 255)",
	colorPrimaryBg: "rgba(30, 94, 255, 0.15)",
	borderRadius: 4,
	colorBorder: "rgb(96, 103, 112)",
	colorBorderSecondary: "rgb(96, 103, 112)",
	colorTextMenu: "rgb(200, 206, 237)",
	colorTextSelectedMenu: "rgb(255, 255, 255)",
	colorTextDisabled: "rgba(255, 255, 255, 0.45)"
	// boxShadowSecondary: "rgba(0, 0, 0, 0.5) 0px 1px 4px 0px", // Тени более насыщенные и глубокие.
	// boxShadowTertiary: "rgba(0, 0, 0, 0.6) 0 0 16px 0", // Делаем их более выраженными, чтобы сохранить визуальную глубину.
	// colorTextMenu: "rgb(170, 175, 200)", // Светлый оттенок текста, чтобы читабельность была на высоте.
	// colorTextSelectedMenu: "rgb(255, 255, 255)"
}

// export const DARK_COLORS: Partial<AliasToken> = {
// 	colorBgLayout: "rgb(245, 246, 250)",
// 	colorPrimary: "rgb(79, 129, 255)",
// 	borderRadius: 4,
// 	boxShadowSecondary: "rgba(21, 34, 50, 0.08) 0px 1px 4px 0px",
// 	boxShadowTertiary: "rgba(103, 116, 142, 0.075) 0 0 16px 0"
// }

export { LIGHT_COLORS, DARK_COLORS }
