//import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';

import getFlashCardTitles from '../../APIs/getFlashCardTitles';
import TitleCard from '../../Components/Library/TitleCard';
import deleteFlashCardSet from '../../APIs/deleteFashCardSet';
import { addError } from '../../Store/errorState';

import './LibraryStyle.css';
import { queryClient } from '../../main';

function LibraryPage() {

    const dispatch = useDispatch();

    const { data, isError, error } = useQuery({
        queryKey: ['titles'], 
        queryFn: () => getFlashCardTitles(), 
    },);

    const { mutate } = useMutation({
        mutationFn: async (title: string) => {
            return await deleteFlashCardSet(title);
        },

        onSuccess: (title) => {
            queryClient.setQueryData(['titles'], (old: string[]) => {
                old.filter(i => i !== title)
            })
        },

        onError: (e : Error) => {
            dispatch(addError(e.message));
        }
    })

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
                        <TitleCard title={title} deleteCard={mutate}/>
                    </div>
                )
            })}
        </div>
    );
}

export default LibraryPage;