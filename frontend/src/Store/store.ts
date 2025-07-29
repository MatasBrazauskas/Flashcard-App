import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from './appState';
import errorsStateReducer from './errorState';

const store = configureStore({
    reducer: {
        appState : appStateReducer,
        errorsState: errorsStateReducer 
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;