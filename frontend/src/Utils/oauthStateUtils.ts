import { type CredentialResponse } from "@react-oauth/google";
import { NAME, PICTURE } from "./constants";
import { jwtDecode } from "jwt-decode";

export const addCredentials = (e : CredentialResponse) => {
    const encodedJWT: {name:string, picture: string} = jwtDecode(e.credential!)

    console.log(e);
    console.table(jwtDecode(e.credential!))

    localStorage.setItem(PICTURE, String(encodedJWT.picture))
    localStorage.setItem(NAME, String(encodedJWT.name))
}