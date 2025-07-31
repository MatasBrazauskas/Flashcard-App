import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";

import NewQuestionComponent from "../Components/NewCard/NewQuestionComponent";
import { addCard } from "../Store/flashCardState";

function NewCardPage() {

    const flashCards = useSelector((state: RootState) => state.FLASH_CARD_STATE_NAME.flashCards);
    const dispatch = useDispatch();

    return (
        <div>
            {flashCards.map((flashCard, i) => {
                return (
                    <div key={i}>
                        <NewQuestionComponent id={flashCard.id} term={flashCard.term} definition={flashCard.definition}/>
                    </div>
                )
            })}

            <button onClick={() => dispatch(addCard())}>Add a Card</button>
        </div>
    )

}

export default NewCardPage;