import { AUTH_ROUTE, HTTP_STATUS } from "../Constants/constants";
import { type AuthResponse } from "../Utils/apiUtils";

async function getJWTtoken(name: string) : Promise<AuthResponse> {
    try{
        const response = await fetch(AUTH_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        });

        const data: AuthResponse = await response.json();
            
        if(response.status === HTTP_STATUS.OK)
        {
            return data;   
        }

    } catch(e){
        console.error(e);
    }
    throw new Error();
}

export default getJWTtoken;