import { CONTROLLER_URL } from '../Constants/constants';
import type { FlashCardInfo } from '../Utils/flashCardStatUtils';

/**
 * Sends a new flash card set to the server using the Fetch API.
 * @param {string} title - The title of the flash card set.
 * @param {FlashCardInfo[]} flashCardArray - An array of flash card objects.
 * @returns {Promise<string>} A promise that resolves to a success or failure message.
 */
async function addNewFlashCardSet(title: string, flashCardArray: FlashCardInfo[]): Promise<string> {
    // Construct the request body as an object
    const requestBody = {
        title: title,
        questions: flashCardArray,
    };

    try {
        // Use the native fetch API to send a POST request.
        // The body must be a JSON string, so we use JSON.stringify().
        console.log(requestBody);
        const response = await fetch(CONTROLLER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // The .ok property is a boolean that checks for a successful status (200-299).
        if (response.ok) {
            return 'Flash Card Set Added Successfully';
        }
    } catch (error) {
        // The catch block will only handle network errors (e.g., no internet, connection timeout).
        console.error('Fetch API Error:', error);
    }

    return 'Flash Card Set Was Not Added';
}

export default addNewFlashCardSet;