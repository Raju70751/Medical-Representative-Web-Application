
export const loadVisits = () => {
    if (typeof window === "undefined") return []

    try {
        const data = localStorage.getItem('visit')
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

export const saveVisits = (visits: any) => {
    if (typeof window === "undefined") return
    localStorage.setItem("visit", JSON.stringify(visits))
}