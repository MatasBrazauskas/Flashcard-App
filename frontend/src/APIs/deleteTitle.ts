import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";
import { addPathSegment, ERROR } from "../Utils/apiUtils";

async function deleteTitle(title: string) : Promise<string> {
    const jwtToken = sessionStorage.getItem(JWT);

    try{
        const response = await fetch(addPathSegment(FLASH_CARD_ROUTE, title), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        console.log(response);

        if(response.status === HTTP_STATUS.CREATED)
            return 'Delete Successfully'

    } catch(e){
        console.error(e);
    }

    return ERROR;
}

export default deleteTitle;