import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';

import getFlashCardTitles from '../../APIs/getFlashCardTitles';
import TitleCard from '../../Components/Library/TitleCard';
import deleteFlashCardSet from '../../APIs/deleteFashCardSet';
import { addError } from '../../Store/errorState';

import './LibraryStyle.css';
import { queryClient } from '../../main';
import { TITLES_CACHE } from '../../Constants/cacheConst';

function LibraryPage() {

    const dispatch = useDispatch();

    const { data, isError, error } = useQuery({
        queryKey: [TITLES_CACHE], 
        queryFn: () => getFlashCardTitles(), 
    },);

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            return await deleteFlashCardSet(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [TITLES_CACHE]});
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

            {data?.map(({title, id }, i) => {
                return (
                    <div key={i}>
                        <TitleCard title={title} id={id} deleteCard={mutate}/>
                    </div>
                )
            })}
        </div>
    );
}

export default LibraryPage;