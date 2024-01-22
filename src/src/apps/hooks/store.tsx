import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../client-slice"

export const store = configureStore({
    reducer:{
        client: clientReducer
    }
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>   