import { create } from "zustand"

interface MenuStore {
	collapsed: boolean
	toggleCollapsed: () => void
}

const useMenuStore = create<MenuStore>()((set) => ({
	collapsed: false,
	toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed }))
}))

export { useMenuStore }
