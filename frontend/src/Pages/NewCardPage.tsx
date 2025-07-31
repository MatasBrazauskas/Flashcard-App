import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";

import NewQuestionComponent from "../Components/NewCard/NewQuestionComponent";
import { addCard } from "../Store/flashCardState";
import addNewFlashCardSet from "../APIs/addNewFlashCardSet";

import './NewCardStyle.css';
import useTitle from "../Hooks/useTitle";

function NewCardPage() {
    const flashCards = useSelector((state: RootState) => state.FLASH_CARD_STATE_NAME.flashCards);
    const {title, dispatchTitle} = useTitle();
    const dispatch = useDispatch();

    return (
        <div className='newcardpage'>
            <div>Create a new flashcard set</div>
            <input type='text' placeholder="Enter a title" onChange={(e) => dispatchTitle(e.target.value)} value={title}/>

            {flashCards.map((flashCard, i) => {
                return (
                    <div key={i}>
                        <NewQuestionComponent id={flashCard.id} term={flashCard.term} definition={flashCard.definition}/>
                    </div>
                )
            })}

            <button onClick={() => dispatch(addCard())}>Add a Card</button>
            <button onClick={() => addNewFlashCardSet(title)}>Create</button>
        </div>
    )

}

export default NewCardPage;