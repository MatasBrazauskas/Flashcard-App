import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";
import { addPathSegment, type Questions } from "../Utils/apiUtils";

async function getFlashCardQuestions(title: string): Promise<Questions[] | null>{
    const jwtToken = localStorage.getItem(JWT);

    try{
        const response = await fetch(addPathSegment(FLASH_CARD_ROUTE, title), {
            method: 'GET',
            headers : {
                'Authorization': `Bearer ${jwtToken}`,
                
            }
        });

        console.log(response);

        if(response.status === HTTP_STATUS.OK){
            return response.json();
        }

    } catch(e){
        console.log(e);
    }
    return null;
}

export default getFlashCardQuestions;