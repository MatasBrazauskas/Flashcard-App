import { configureStore } from "@reduxjs/toolkit";
import errorsStateReducer from './errorState';

const store = configureStore({
    reducer: {
        errorsState: errorsStateReducer 
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;