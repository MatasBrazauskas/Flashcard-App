import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";
import { addPathSegment } from "../Utils/apiUtils";
import { DELETION_ERROR } from "../Utils/errorStateUtils";

async function deleteFlashCardSet(id: number) : Promise<string> {
    const jwtToken = sessionStorage.getItem(JWT);

    console.log(jwtToken);

    try{
        const response = await fetch(addPathSegment(FLASH_CARD_ROUTE, String(id)), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        console.log(response);

        if(response.status === HTTP_STATUS.NO_CONTENT)
            return 'Delete Successfully'

    } catch(e){
        console.error(e);
    }

    throw new Error(DELETION_ERROR);
}

export default deleteFlashCardSet;