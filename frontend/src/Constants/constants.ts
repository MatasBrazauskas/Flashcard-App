export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const FLASH_CARD_ROUTE = import.meta.env.VITE_FLASH_CARD_ROUTE;
export const AUTH_ROUTE = import.meta.env.VITE_AUTH_ROUTE;

export const NAME = 'name';
export const JWT = 'jwt';
export const PICTURE = 'pic';
export const PICTURES_HEIGHT = 40;

export const OAUTH_PAGE_URL = ''
export const MAIN_PAGE_URL = '/mainPage'

export const HOME_PAGE_URL = 'home'
export const LIBRARY_PAGE_URL = 'library'
export const NEW_CARD_PAGE_URL = 'addNewCard'

export const HTTP_STATUS = {
    OK: 200 as const,
    CREATED: 201 as const,
    NOT_FOUND: 404 as const,
    INTERNAL_SERVER_ERROR: 500 as const,
};