import { configureStore } from "@reduxjs/toolkit";
import errorsStateReducer from './errorState';
import appStateReducer from './appState';

const store = configureStore({
    reducer: {
        appState: appStateReducer,
        errorsState: errorsStateReducer 
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;