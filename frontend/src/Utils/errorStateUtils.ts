export type ERRORS = {
    errors: string[],
}

export const ERRORS_STATE_NAME = 'errorsState';

export const DELETION_ERROR = 'Failed to delete a card';
export const CARD_ADDITION_ERROR = 'Failed to add flash card set';
export const GETTING_QUESTIONS_ERROR = 'Failed to get flash card set questions';
export const GETTING_USER_FLASH_CARD_TITLES_ERROR = 'Failed to get users flash card titles';
