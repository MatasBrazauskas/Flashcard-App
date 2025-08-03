import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";

async function getFlashCardTitles() : Promise<string[] | null> {
    const jwtToken = sessionStorage.getItem(JWT);

    try{
        const response = await fetch(FLASH_CARD_ROUTE, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            }
        });

        console.log(response);

        if(response.status === HTTP_STATUS.OK){
            return response.json();
        }

    } catch(e){
        console.error(e);
    }
    return null;
}

export default getFlashCardTitles;