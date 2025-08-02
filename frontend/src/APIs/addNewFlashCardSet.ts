import { FLASH_CARD_ROUTE, JWT } from '../Constants/constants';
import type { FlashCardInfo } from '../Utils/flashCardStatUtils';

import { NAME } from '../Constants/constants';

async function addNewFlashCardSet(title: string, flashCardArray: FlashCardInfo[]): Promise<string> {

    const requestBody = {
        name: localStorage.getItem(NAME!),
        title: title,
        questions: flashCardArray.map((fl) => ({ term: fl.term, definition: fl.definition }))
    };

    const jetToken = sessionStorage.getItem(JWT);

    try {
        console.log(requestBody);
        const response = await fetch(FLASH_CARD_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jetToken}`, 
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