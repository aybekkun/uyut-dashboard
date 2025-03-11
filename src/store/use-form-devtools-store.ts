import { create } from "zustand"
import { devtools } from "zustand/middleware"

type ParamsForm = Record<string, unknown>

interface FormDevtoolsStore {
	params: ParamsForm | null
	isForm: boolean
	toggleForm: () => void
	setParams: (params: ParamsForm) => void
	resetParams: () => void
}

const useFormDevtoolsStore = create(
	devtools<FormDevtoolsStore>(
		(set) => ({
			params: null,
			isForm: false,
			toggleForm: () => set((state) => ({ isForm: !state.isForm })),
			setParams: (params) => set({ params, isForm: true }),
			resetParams: () => set({ params: null, isForm: false })
		}),
		{
			name: "form",
			anonymousActionType: "form"
		}
	)
)

export { useFormDevtoolsStore, type ParamsForm }
