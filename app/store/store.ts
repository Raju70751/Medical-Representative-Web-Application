import { configureStore } from "@reduxjs/toolkit";
import visitReducer from '@/app/store/visitSite'
import { loadVisits, saveVisits } from '@/app/store/localStorage'

export const store = configureStore({
    reducer: {
        visit: visitReducer
    },
    preloadedState: {
        visit: {
            visits: loadVisits()
        },
    },
})

store.subscribe(() => {
    saveVisits(store.getState().visit.visits)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
