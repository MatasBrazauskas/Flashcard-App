import { AUTH_ROUTE } from "../Constants/constants";

async function getJWTtoken(name: string) : Promise<{token: string} | null> {
    try{
        const response = await fetch(AUTH_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        });

        if(response.status === 201)
        {   
            return response.json();
        }

    } catch(e){
        console.error(e);
    }
    return null;
}

export default getJWTtoken;