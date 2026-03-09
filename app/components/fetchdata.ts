
export const fetchVisits = async () => {
    const res = await fetch('/api/visits')
    const data = await res.json()
    console.log(data)
    return data
}