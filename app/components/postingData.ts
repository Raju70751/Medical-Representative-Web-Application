
type VisitPayload = {
    id: string
    name: string
    location: string
    date: string
    pharmacy: string
    remarks: string
}

export const PostingData = async (data: VisitPayload) => {
    const res = await fetch('/api/visits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error('Failed to post visit')
    }

    return res.json()
}
