import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { MAIN_PAGE_URL, NAME } from "../../Constants/constants";
import { addCredentials } from "../../Utils/oauthStateUtils";
//import getJWTtoken from "../../APIs/getJWTtoken";

import './OAuthStyle.css';

function LandingPage() {
    const navigation = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem(NAME);

        const temp = async () => {
            if(name !== null){
                navigation(MAIN_PAGE_URL);
            }
        }

        temp();
    }, []);

    return (
        <div className='card'>
            <div className='container'>
                <div className='title'>WELCOME TO FLASH CARD APP</div>
                <div>Log in With Google</div>
                <GoogleLogin size='large' theme='filled_black' shape='pill' text='continue_with' logo_alignment='center' 
                    onSuccess={(e) => { addCredentials(e), navigation(MAIN_PAGE_URL)}} 
                />
            </div>
        </div>
    );
}

export default LandingPage;