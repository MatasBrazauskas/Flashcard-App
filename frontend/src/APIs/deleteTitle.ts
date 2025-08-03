import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from "../Constants/constants";
import { addPathSegment } from "../Utils/apiUtils";

async function deleteTitle(title: string) : Promise<string | null> {
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

    return null
}

export default deleteTitle;