import { useEffect } from "react"

export const pageTop = (title) => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = title
    }, [])
}
// - MAS Social Media