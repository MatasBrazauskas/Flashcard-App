import { useEffect, useState } from 'react';

import getFlashCardQuestions from '../../APIs/getFlashCardQuestions';
import { type Questions } from '../../Utils/apiUtils';

function StudyPage(title: string) {

    const [questions, setQuestions] = useState<Questions[]>([]);

    useEffect(() => {
        const APICall = async () => {

            const response = await getFlashCardQuestions(title);

            if(response !== null){
                setQuestions(response);
            }
        }

        APICall();
    }, []);

    return (
        <div>
            <div>{title}</div>

            {questions.map((question, i) => {
                return (
                    <div key={i}>
                        <div>{question.term}</div>
                        <div>{question.definition}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default StudyPage;