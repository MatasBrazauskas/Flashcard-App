import { useState, useEffect } from 'react';
import getFlashCardTitles from '../APIs/getFlashCardTitles';

function LibraryPage() {

    const [titles, setTitles] = useState<string[]>([]);

    useEffect(() => {
        const apiCall = async () => {
            const response = await getFlashCardTitles();

            if(response !== null){
                setTitles(response);
            }
            
        }
        
        apiCall();

    }, []); 

    return (
        <div>
            <div>LibraryPage</div>

            {titles.map((title, i) => {
                return (
                    <div key={i}>{title}</div>
                )
            })}
        </div>
    );
}

export default LibraryPage;