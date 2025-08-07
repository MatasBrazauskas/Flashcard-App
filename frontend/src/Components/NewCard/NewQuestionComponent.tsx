import useInput from '../../Hooks/useInput';
import { TERM_LENGTH_MAX, DEFINITION_LENGTH_MAX, TERM_PLACEHOLDER, DEFINITION_PLACEHOLDER, LENGTH_ERROR } from '../../Constants/newCardConst';

import { TERM, DEFINITION, } from '../../Utils/flashCardStatUtils'; 
import { type FlashCardInfo } from '../../Utils/flashCardStatUtils';

import { deleteCard } from '../../Store/flashCardState';

import { useDispatch } from 'react-redux';

import './NewQuestionStyle.css';

function NewQuestionComponent({id, term, definition} : FlashCardInfo) {

    const setTerm = useInput(TERM_LENGTH_MAX, LENGTH_ERROR);
    const setDefinition = useInput(DEFINITION_LENGTH_MAX, LENGTH_ERROR);
    const dispatch = useDispatch();

    return (
        <div className='question'>
            <div className='top'>
                <div>{id}</div>
                <button className = 'btn btn-danger'onClick={() => dispatch(deleteCard(id))}>Delete Card</button>
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

export default NewQuestionComponent;