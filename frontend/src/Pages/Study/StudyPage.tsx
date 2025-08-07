import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useReducer, useContext, createContext } from 'react';

import getFlashCardQuestions from '../../APIs/getFlashCardQuestions';
import { QUESTIONS_CACHE } from '../../Constants/cacheConst';
import EditComponent from '../../Components/Study/EditComponent';
import QuizDisplay from '../../Components/Study/QuizDisplay';

import './StudyStyle.css';
import type { Questions } from '../../Utils/apiUtils';
export const UserContext = createContext<Questions[]>([]);

function StudyPage() {

    const { title, id } = useParams();

    const { data, isError, error } = useQuery({
        queryKey: [QUESTIONS_CACHE, title!],
        queryFn: () => getFlashCardQuestions(Number(id)!),
    });

    return (
        <UserContext.Provider value={data!}>
            <div className='container'>
                {isError && <div>{error!.message}</div>}
                <QuizDisplay />
                <EditComponent />
            </div>
        </UserContext.Provider>
    )
}

export default StudyPage;