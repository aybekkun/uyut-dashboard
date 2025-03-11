import type { ParamsForm } from "src/store/use-form-devtools-store"

export const isParamsFormValidate = <T extends ParamsForm>(
	params: ParamsForm | null
): params is T => {
	if (params === null) return false
	const requiredKeys: (keyof T)[] = Array<keyof T>()
	return requiredKeys.every((key) => key in params)
}
