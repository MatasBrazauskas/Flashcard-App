import useInput from '../../Hooks/useInput';
import { TERM_LENGTH_MAX, DEFINITION_LENGTH_MAX, TERM_PLACEHOLDER, DEFINITION_PLACEHOLDER, LENGTH_ERROR } from '../../Constants/newCardConst';
import deleteSetQuestion from '../../APIs/deleteSetQuestion';

import { TERM, DEFINITION, } from '../../Utils/flashCardStatUtils'; 
import { type FlashCardInfo } from '../../Utils/flashCardStatUtils';

import '../NewCard/NewQuestionStyle.css';
import { queryClient } from '../../main';
import { QUESTIONS_CACHE } from '../../Constants/cacheConst';

type AlteringFlashCards = FlashCardInfo & {
    deleteQuestions: (id: number) => void,
}

function QuestionsDisplayComponent({id, term, definition, deleteQuestions} : AlteringFlashCards) {

    const setTerm = useInput(TERM_LENGTH_MAX, LENGTH_ERROR);
    const setDefinition = useInput(DEFINITION_LENGTH_MAX, LENGTH_ERROR);

    return (
        <div className='question'>
            <div className='top'>
                <div>{id}</div>
                <button className = 'btn btn-danger'onClick={() => { deleteQuestions(id), deleteQuestions, queryClient.invalidateQueries({ queryKey:[QUESTIONS_CACHE]})}}>Delete Card</button>
            </div>
            <form className='bottom'>
                <div>
                    <input type='text' placeholder={TERM_PLACEHOLDER} value={term} onChange={(e) => setTerm(id, e.target.value, TERM)}/>
                    <div>TERM ({term.length} / {TERM_LENGTH_MAX})</div>
                </div>

                <div>
                    <input type='text' placeholder={DEFINITION_PLACEHOLDER} value={definition} onChange={(e) => setDefinition(id, e.target.value, DEFINITION)}/>
                    <div>DEFINITION ({definition.length} / {DEFINITION_LENGTH_MAX})</div>
                </div>
            </form>
        </div>
    )
}

export default QuestionsDisplayComponent;