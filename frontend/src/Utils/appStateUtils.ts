export type APP_STATE = 
    | 'AUTH'
    | 'MAIN'
    | 'NEW'

export type APP_STATE_CURR = {
    appState: APP_STATE,
}