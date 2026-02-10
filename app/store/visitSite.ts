import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Visit {
    id: string
    name: string
    location: string
    date: string
    pharmacy: string
    remarks: string
}

interface VisitState {
    visits: Visit[]
}

const initialState: VisitState = {
    visits: []
}

const VisitSlice = createSlice({
    name: 'visit',
    initialState,
    reducers: {
        addvishlist(state, action: PayloadAction<Visit>) {
            state.visits.push(action.payload)
        },
        removelist(state, action: PayloadAction<string>) {
            state.visits = state.visits.filter((visit) => {
                visit.id !== action.payload
            })
        }
    }
})

export const { addvishlist, removelist } = VisitSlice.actions
export default VisitSlice.reducer