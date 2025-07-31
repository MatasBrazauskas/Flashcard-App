import { configureStore } from "@reduxjs/toolkit";
import errorsStateReducer from './errorState';
import flashCardStateReducer from './flashCardState';

const store = configureStore({
    reducer: {
        ERRORS_STATE_NAME: errorsStateReducer,
        FLASH_CARD_STATE_NAME: flashCardStateReducer, 
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;