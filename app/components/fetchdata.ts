
export const data = async () => {
    const res = await fetch('@/app/api/visits')
    const data = res.json()
    return data
}