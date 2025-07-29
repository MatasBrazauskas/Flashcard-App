import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { type OAuthProps } from "../Utils/oauthStateUtils";
import { MAIN_PAGE_URL, NAME } from "../Utils/constants";

function LandingPage({addCredentials} : OAuthProps) {
    const navigation = useNavigate();

    useEffect(() => {
        if(localStorage.getItem(NAME) !== null){
            navigation(MAIN_PAGE_URL);
        }
    }, [])

    return (
        <GoogleLogin 
            onSuccess={(e) => { addCredentials(e), navigation(MAIN_PAGE_URL)}} 
        />
    );
}

export default LandingPage;