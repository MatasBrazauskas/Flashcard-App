import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";
import { addPathSegment, type Questions } from "../Utils/apiUtils";
import { GETTING_QUESTIONS_ERROR } from "../Utils/errorStateUtils";

async function getFlashCardQuestions(id: number): Promise<Questions[]>{
    const jwtToken = sessionStorage.getItem(JWT);
    console.warn('This is JWT token ', jwtToken);

    try{
        const response = await fetch(addPathSegment(FLASH_CARD_ROUTE, String(id)), {
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
    throw new Error(GETTING_QUESTIONS_ERROR)
}

export default getFlashCardQuestions;