import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import getFlashCardQuestions from '../../APIs/getFlashCardQuestions';
import { type Questions } from '../../Utils/apiUtils';

function StudyPage() {

    const { title } = useParams();

    const { data, isError, error } = useQuery({
        queryKey: ['questions'],
        queryFn: () => getFlashCardQuestions(title!),
    });

    return (
        <div>
            {isError && <div>
                {error!.message}    
            </div>}

            <div>{title}</div>

            {data?.map((questions, i) => {
                return (
                    <div key={i}>
                        <div>{questions.term}</div>
                        <div>{questions.definition}</div>
                    </div>
            );})}
        </div>
    )
}

export default StudyPage;