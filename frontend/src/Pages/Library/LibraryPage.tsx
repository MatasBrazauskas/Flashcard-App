import { useState, useEffect } from 'react';
import getFlashCardTitles from '../../APIs/getFlashCardTitles';
import TitleCard from '../../Components/Library/TitleCard';

import './LibraryStyle.css';

function LibraryPage() {

    const [titles, setTitles] = useState<string[]>([]);

    useEffect(() => {
        const apiCall = async () => {
            const response = await getFlashCardTitles();
            console.log(response);

            if(response !== null){
                setTitles(response);
            }
            
        }
        
        apiCall();

    }, []); 

    return (
        <div className='body'>
            <div>Your Library</div>

            {titles.map((title, i) => {
                return (
                    <div key={i}>
                        <TitleCard title={title}/>
                    </div>
                )
            })}
        </div>
    );
}

export default LibraryPage;