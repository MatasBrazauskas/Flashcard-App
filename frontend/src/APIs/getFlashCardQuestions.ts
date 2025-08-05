import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";
import { addPathSegment, type Questions } from "../Utils/apiUtils";

async function getFlashCardQuestions(title: string): Promise<Questions[] | null>{
    const jwtToken = sessionStorage.getItem(JWT);
    console.warn('This is JWT token ', jwtToken);

    try{
        const response = await fetch(addPathSegment(FLASH_CARD_ROUTE, title), {
            method: 'GET',
            headers : {
                'Authorization': `Bearer ${jwtToken}`,
                
            }
        });

        const data: Questions[] = await response.json();
        console.log(response);

        if(response.status === HTTP_STATUS.OK){
            return data;
        }

    } catch(e){
        console.error(e);
    }
    return null;
}

export default getFlashCardQuestions;