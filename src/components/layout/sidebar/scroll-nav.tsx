import { type FC, type PropsWithChildren } from "react"
import { useStylesSidebar } from "./use-styles-sidebar"

interface ScrollNavProps {
	collapsed: boolean
}

const ScrollNav: FC<PropsWithChildren<ScrollNavProps>> = ({
	children,
	collapsed
}) => {
	const { styles } = useStylesSidebar({
		collapsed
	})
	return <nav className={styles.nav}>{children}</nav>
}

export { ScrollNav }
