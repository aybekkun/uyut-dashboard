import { create } from "zustand"
import { persist } from "zustand/middleware"

interface MenuStore {
	collapsed: boolean
	toggleCollapsed: () => void
}

const useMenuStore = create<MenuStore>()(
	persist(
		(set) => ({
			collapsed: false,
			toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed }))
		}),
		{
			name: "menu-storage"
		}
	)
)

export { useMenuStore }
