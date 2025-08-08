import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, createContext, type SetStateAction } from 'react';

import getFlashCardQuestions from '../../APIs/getFlashCardQuestions';
import { QUESTIONS_CACHE } from '../../Constants/cacheConst';
import EditComponent from '../../Components/Study/EditComponent';
import QuizDisplay from '../../Components/Study/QuizDisplay';

import './StudyStyle.css';
import type { Questions } from '../../Utils/apiUtils';

export type Study = {
    study: boolean,
    setStudy: React.Dispatch<SetStateAction<boolean>>
}

export type Edit = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>
}

export const UserContext = createContext<Questions[]>([]);
export const StudyContext = createContext<Study | null>(null);
export const EditContext=  createContext<Edit | null>(null);

function StudyPage() {

    const { title, id } = useParams();

    const [study, setStudy] = useState(false);
    const [edit, setEdit] = useState(false);

    const { data, isError, error } = useQuery({
        queryKey: [QUESTIONS_CACHE, title!],
        queryFn: () => getFlashCardQuestions(Number(id)!),
    });

    return (
        <UserContext.Provider value={data!}>
            <div className='container'>
                {isError && <div>{error!.message}</div>}

                {!edit &&
                    <StudyContext.Provider value={{study: study, setStudy: setStudy}}>
                        <QuizDisplay />
                    </StudyContext.Provider>
                }

                {!study && 
                    <EditContext.Provider value = {{edit: edit, setEdit: setEdit}} >
                        <EditComponent id={Number(id)}/>
                    </EditContext.Provider>
                }
            </div>
        </UserContext.Provider>
    )
}

export default StudyPage;