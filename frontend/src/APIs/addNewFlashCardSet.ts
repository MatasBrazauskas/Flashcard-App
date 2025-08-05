import { FLASH_CARD_ROUTE, JWT, HTTP_STATUS } from '../Constants/constants';
import type { FlashCardInfo } from '../Utils/flashCardStatUtils';
import { truncateInput, ERROR } from '../Utils/apiUtils';

import { TITLE_LENGTH_MAX, TERM_LENGTH_MAX, DEFINITION_LENGTH_MAX } from '../Constants/newCardConst';

import { NAME } from '../Constants/constants';

async function addNewFlashCardSet(title: string, flashCardArray: FlashCardInfo[]): Promise<string> {

    const requestBody = {
        name: localStorage.getItem(NAME!),
        title: truncateInput(title, TITLE_LENGTH_MAX),
        questions: flashCardArray.map((fl) => ({ term: truncateInput(fl.term, TERM_LENGTH_MAX), definition: truncateInput(fl.definition, DEFINITION_LENGTH_MAX) }))
    };

    const jwtToken = sessionStorage.getItem(JWT);

    try {
        console.log(requestBody);
        const response = await fetch(FLASH_CARD_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`, 
            },
            body: JSON.stringify(requestBody),
        });

        console.log(response);

        if (response.status === HTTP_STATUS.CREATED) {
            return 'Flash Card Set Added Successfully';
        }
    } catch (error) {
        console.error(error);
    }
    return ERROR;
}

export default addNewFlashCardSet;