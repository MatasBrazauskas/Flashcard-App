import { useState, useEffect } from 'react';
import getFlashCardTitles from '../APIs/getFlashCardTitles';
import { NAME } from '../Constants/constants';

function LibraryPage() {

    const [titles, setTitles] = useState<string[]>([]);

    useEffect(() => {
        const name = localStorage.getItem(NAME);
        const apiCall = async (name : string) => {

            const response = await getFlashCardTitles(name);
        }
        
        apiCall(name!);

    }, []); 

    return (
        <div>LibraryPage</div>
    );
}

export default LibraryPage;