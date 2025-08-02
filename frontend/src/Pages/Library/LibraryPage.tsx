import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import getFlashCardTitles from '../../APIs/getFlashCardTitles';
import TitleCard from '../../Components/Library/TitleCard';
import deleteTitle from '../../APIs/deleteTitle';
import { addError } from '../../Store/errorState';

import './LibraryStyle.css';

function LibraryPage() {

    const [titles, setTitles] = useState<string[]>([]);
    const dispatch = useDispatch();

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

    const deleteCard = async (title: string) => {
        const message = await deleteTitle(title);
        dispatch(addError(message!));
        setTitles(arr => arr.filter(i => i !== title));
    }

    return (
        <div className='body'>
            <div>Your Library</div>

            {titles.map((title, i) => {
                return (
                    <div key={i}>
                        <TitleCard title={title} deleteCard={deleteCard}/>
                    </div>
                )
            })}
        </div>
    );
}

export default LibraryPage;