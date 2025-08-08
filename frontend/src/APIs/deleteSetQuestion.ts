import { HTTP_STATUS, JWT } from "../Constants/constants";
import { FLASH_CARD_ROUTE } from "../Constants/constants";

async function deleteSetQuestion(setId: number, term: string): Promise<string> {
    const jwtToken = sessionStorage.getItem(JWT);
    try{
        const response = await fetch(`FLASH_CARD_ROUTE/${setId}/${term}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            }
        })

        console.log(response);

        if(response.status === HTTP_STATUS.NO_CONTENT){
            return 'Question deleted successfully';
        }

    } catch(e){
        console.error(e);
    }

    throw new Error("Error deleting the question from set");
}

export default deleteSetQuestion;