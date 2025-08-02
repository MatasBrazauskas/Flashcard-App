import { LIBRARY_ROUTE, JWT } from "../Constants/constants";

async function getFlashCardTitles() : Promise<string[] | null> {
    const jetToken = sessionStorage.getItem(JWT);

    try{
        const response = await fetch(LIBRARY_ROUTE, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jetToken}`,
            }
        });

        if(response.ok){
            return response.json();
        }

    } catch(e){
        console.error(e);
    }
    return null;
}

export default getFlashCardTitles;