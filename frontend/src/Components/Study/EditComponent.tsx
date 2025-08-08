import { useContext, useState, useReducer } from 'react';

import { EditContext, UserContext } from '../../Pages/Study/StudyPage';

import './EditStyle.css';
import QuestionsDisplayComponent from './QuestionsDisplayComponent';
import type { Questions } from '../../Utils/apiUtils';

function EditComponent({id} : {id: number}){

    const questions = useContext(UserContext);
    const [alteredQuestions, setAlteredQuestions] = useState(questions);

    const editContext = useContext(EditContext);

    if(editContext === null){
        return ;
    }

    const {edit, setEdit } = editContext;

    const addQuestion = () => {
        setAlteredQuestions(arr => [...arr, {term: '', definition: ''}]);
    }

    const deleteQuestions = (id: number) => {
        setAlteredQuestions(arr => arr.filter((_,i) => i !== id)) 
    }

    return (
        <div>
            {!edit &&
                <div>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>
            }
            {questions?.map((question, i) => {
                return (
                    <div key={i}>
                        <QuestionsDisplayComponent id={i} term={question?.term} definition={question?.definition} deleteQuestions={deleteQuestions}/>
                    </div>
                )
            })}

            {edit && 
            <div>
                <button onClick={() => setEdit(false)}>Done</button>
            </div>}

        </div>
    )
}

export default EditComponent;