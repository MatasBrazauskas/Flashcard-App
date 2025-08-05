import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useReducer } from 'react';

import getFlashCardQuestions from '../../APIs/getFlashCardQuestions';
import QuestionsDisplay from '../../Components/QuestionsDisplay';

function StudyPage() {

    const { title } = useParams();

    const [index, setIndex] = useReducer((index: number) => {
        if(index + 1 >= data?.length!){
            setStudying(false);
            setEdit(false)
            return 0;
        }
        return index;
    }, 0);

    const [studying, setStudying] = useState(false);
    const [edit, setEdit] = useState(false);

    const { data, isError, error } = useQuery({
        queryKey: ['questions', title!],
        queryFn: () => getFlashCardQuestions(title!),
    });

    return (
        <div>
            {isError && <div>
                {error!.message}    
            </div>}

            <div>{title}</div>

            <QuestionsDisplay term={data?.at(index)?.term!} definition={data?.at(index)?.definition!}/>

            <button onClick={() => setEdit(!edit)}>Edit Flash Cards</button>
            <button onClick={() => setStudying(!studying)}>Start Study</button>

            {!studying && data?.map((questions, i) => {
                return (
                    <div key={i}>
                        
                    </div>
            );})}

            {edit && 
            <button onClick={() => {alert('Done'), setEdit(!edit)}}>Done</button>}

        </div>
    )
}

export default StudyPage;