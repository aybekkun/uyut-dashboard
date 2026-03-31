import { create } from "zustand"
import { persist } from "zustand/middleware"

interface MenuStore {
	collapsed: boolean
	toggleCollapsed: () => void
	order: string[]
	setOrder: (order: string[]) => void
	moveUp: (key: string) => void
	moveDown: (key: string) => void
}

const useMenuStore = create<MenuStore>()(
	persist(
		(set) => ({
			collapsed: false,
			toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
			order: [],
			setOrder: (order) => set({ order }),
			moveUp: (key) =>
				set((state) => {
					const index = state.order.indexOf(key)
					if (index <= 0) return state
					const newOrder = [...state.order]
					;[newOrder[index - 1], newOrder[index]] = [
						newOrder[index],
						newOrder[index - 1]
					]
					return { order: newOrder }
				}),
			moveDown: (key) =>
				set((state) => {
					const index = state.order.indexOf(key)
					if (index === -1 || index === state.order.length - 1) return state
					const newOrder = [...state.order]
					;[newOrder[index], newOrder[index + 1]] = [
						newOrder[index + 1],
						newOrder[index]
					]
					return { order: newOrder }
				})
		}),
		{
			name: "menu-storage"
		}
	)
)

export { useMenuStore }
