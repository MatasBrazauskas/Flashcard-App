import { CONTROLLER_URL } from '../Constants/constants';
import type { FlashCardInfo } from '../Utils/flashCardStatUtils';

async function addNewFlashCardSet(title: string, flashCardArray: FlashCardInfo[]): Promise<string> {

    /*fix the tempArr variables and clean up the api */
    const tempArr = []

    for(let i = 0; i < flashCardArray.length; i++)
    {
        tempArr.push({term: flashCardArray[i].term, definition: flashCardArray[i].definition});
    }

    const requestBody = {
        title: title,
        questions: tempArr,
    };

    try {
        console.log(requestBody);
        const response = await fetch(CONTROLLER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            return 'Flash Card Set Added Successfully';
        }
    } catch (error) {
        console.error('Fetch API Error:', error);
    }

    return 'Flash Card Set Was Not Added';
}

export default addNewFlashCardSet;