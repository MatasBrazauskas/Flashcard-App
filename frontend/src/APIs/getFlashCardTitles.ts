import { LIBRARY_CONTROLLER_URL } from "../Constants/constants";

async function getFlashCardTitles(name: string) : Promise<string | null> {

    try{
        const response = await fetch(LIBRARY_CONTROLLER_URL + `/${name}`, {
            method: 'GET',
        });

        console.log(response);

        if(response.ok){
            return 'ok';
        }

    } catch(e){
        console.error(e);
    }
    return null;
}

export default getFlashCardTitles;