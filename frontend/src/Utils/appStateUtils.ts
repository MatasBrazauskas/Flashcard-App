export type APP_STATE = 
    | 'HOME'
    | 'LIBRARY'
    | 'NEW'

export type APP_STATE_CURR = {
    appState: APP_STATE,
}