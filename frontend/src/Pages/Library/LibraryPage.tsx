//import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import getFlashCardTitles from '../../APIs/getFlashCardTitles';
import TitleCard from '../../Components/Library/TitleCard';
import deleteTitle from '../../APIs/deleteTitle';
import { addError } from '../../Store/errorState';

import './LibraryStyle.css';
import { queryClient } from '../../main';

function LibraryPage() {

    const dispatch = useDispatch();

    const { data, isError, error, refetch } = useQuery({
        queryKey: ['titles'], 
        queryFn: () => getFlashCardTitles(), 
    },);

    const deleteCard = async (title: string) => {
        const message = await deleteTitle(title);
        dispatch(addError(message!));
        queryClient.setQueryData(['titles'], (old: string[]) => [...(old || []), title]);
        //refetch();
    }

    return (
        <div className='body'>
            {isError && 
            <div>
                {error!.message}    
            </div>}
            <div>Your Library</div>

            {data?.map((title, i) => {
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