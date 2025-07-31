import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FLASH_CARD_STATE_NAME, type flashCardsInit, type FlashCardProperties } from "../Utils/flashCardStatUtils";

const initialState : flashCardsInit = {
    flashCards: [],
}

const flashCardSlice = createSlice({
    name: FLASH_CARD_STATE_NAME,
    initialState,
    reducers : {
        addCard: (state: flashCardsInit) => {
            state.flashCards = [...state.flashCards, {id: state.flashCards.length, term: '', definition: ''}];
        },
        updateCard: (state: flashCardsInit, action: PayloadAction<{id: number, newValue: string, property: FlashCardProperties}>) => {
            state.flashCards[action.payload.id][action.payload.property] = action.payload.newValue;
        },
        deleteCard: (state: flashCardsInit, action: PayloadAction<number>) => {
            state.flashCards = state.flashCards.filter((_, i) => i !== action.payload);
            state.flashCards.forEach((flashCard, i) => flashCard.id = i);
        }
    }
});

export const { addCard, updateCard, deleteCard } = flashCardSlice.actions;

export default flashCardSlice.reducer;
