export const loadVisits = () => {
    if (typeof window === "undefined") return

    const now = new Date()

    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)

    const timeUntilMidnight = midnight.getTime() - now.getTime()

    setTimeout(() => {
        localStorage.removeItem("visit")

        // schedule again for next day
        loadVisits()
    }, timeUntilMidnight)
}


export const saveVisits = (visits: any) => {
    if (typeof window === "undefined") return
    localStorage.setItem("visit", JSON.stringify(visits))
}

