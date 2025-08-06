export const truncateInput = (input: string, length: number) => {
    return input.substring(0, length);
}

export const addPathSegment = (url: string, query: string) => {
    return url + `/${query}`;
}

export type Questions = {
    term: string,
    definition: string,
}

export type AuthResponse = {
    token: string,
}