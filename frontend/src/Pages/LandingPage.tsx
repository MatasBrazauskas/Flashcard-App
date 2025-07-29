import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux";
import { setAppState } from "../Store/appState";

import { type CredentialResponse } from "@react-oauth/google";

import { NAME } from "../Utils/constants";

function LandingPage() {

    const dispatch = useDispatch();

    const changeState = (e: CredentialResponse) => {
        const encodedJWT: {name:string} = jwtDecode(e.credential!)
        localStorage.setItem(NAME, String(encodedJWT.name))

        dispatch(setAppState('MAIN'))
    }

    return (
        <GoogleLogin 
            onSuccess={(e) => changeState(e)} 
        />
    );
}

export default LandingPage;