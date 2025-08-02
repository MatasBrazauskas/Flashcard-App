import { FLASH_CARD_ROUTE, JWT } from "../Constants/constants";

async function deleteTitle(title: string) : Promise<string | null> {
    const jwtToken = sessionStorage.getItem(JWT);

    try{
        const response = await fetch(FLASH_CARD_ROUTE + `/${title}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        console.error(response);

        if(response.status === 200)
            return 'Delete Successfully'

    } catch(e){
        console.error(e);
    }

    return null
}

export default deleteTitle;