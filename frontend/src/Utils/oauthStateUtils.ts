import { type CredentialResponse } from "@react-oauth/google";
import { NAME } from "./constants";
import { jwtDecode } from "jwt-decode";

export type OAUTH_STATE = {
    success: boolean,
}

export type OAuthProps = {
    addCredentials: (e : CredentialResponse) => void,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

export const addCredentials = (e : CredentialResponse) => {
    const encodedJWT: {name:string} = jwtDecode(e.credential!)
    localStorage.setItem(NAME, String(encodedJWT.name))
}