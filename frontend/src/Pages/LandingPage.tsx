import { GoogleLogin } from "@react-oauth/google";
import { type OAuthProps } from "../Utils/oauthStateUtils";

function LandingPage({addCredentials, setLoggedIn} : OAuthProps) {

    return (
        <GoogleLogin 
            onSuccess={(e) => { addCredentials(e), setLoggedIn(true) }} 
        />
    );
}

export default LandingPage;