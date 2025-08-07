import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";
import { GETTING_USER_FLASH_CARD_TITLES_ERROR } from "../Utils/errorStateUtils";
import { type TitlesDTO } from "../Utils/apiUtils";

async function getFlashCardTitles() : Promise<TitlesDTO[]> {
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
    throw new Error(GETTING_USER_FLASH_CARD_TITLES_ERROR);
}

export default getFlashCardTitles;