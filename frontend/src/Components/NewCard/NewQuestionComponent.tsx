import useInput from '../../Hooks/useInput';
import { TERM_LENGTH_ERROR, TERM_LENGTH_MAX, DEFINITION_LENGTH_ERROR, DEFINITION_LENGTH_MAX, TERM_PLACEHOLDER, DEFINITION_PLACEHOLDER } from '../../Constants/newCardConst';

import { TERM, DEFINITION } from '../../Utils/flashCardStatUtils'; 
import { type FlashCardInfo } from '../../Utils/flashCardStatUtils';

import { deleteCard } from '../../Store/flashCardState';
import { useDispatch } from 'react-redux';

function NewQuestionComponent({id, term, definition} : FlashCardInfo) {

    const setTerm = useInput(TERM_LENGTH_MAX, TERM_LENGTH_ERROR);
    const setDefinition = useInput(DEFINITION_LENGTH_MAX, DEFINITION_LENGTH_ERROR);
    const dispatch = useDispatch();

    return (
        <div>
            <div>{id}</div>
            <button onClick={() => dispatch(deleteCard(id))}>Delete Card</button>
            <form>
                <input type='text' placeholder={TERM_PLACEHOLDER} value={term} onChange={(e) => setTerm(id, e.target.value, TERM)}/>
                <input type='text' placeholder={DEFINITION_PLACEHOLDER} value={definition} onChange={(e) => setDefinition(id, e.target.value, DEFINITION)}/>
            </form>
        </div>
    )
}

export default NewQuestionComponent;