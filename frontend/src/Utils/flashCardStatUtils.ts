export const TERM = 'term';
export const DEFINITION = 'definition';

export type FlashCardProperties = 
    | typeof TERM
    | typeof DEFINITION

export type FlashCardInfo = {
    id: number,
    term: string,
    definition: string,
}

export type flashCardsInit = {
    flashCards: FlashCardInfo[],
} 

export const FLASH_CARD_STATE_NAME = 'flashCardState'