import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import type { RootState } from "../../Store/store";

import NewQuestionComponent from "../../Components/NewCard/NewQuestionComponent";
import { addCard } from "../../Store/flashCardState";
import addNewFlashCardSet from "../../APIs/addNewFlashCardSet";
import { addError } from "../../Store/errorState";

import './NewCardStyle.css';
import useTitle from "../../Hooks/useTitle";
import type { FlashCardInfo } from "../../Utils/flashCardStatUtils";
import { queryClient } from "../../main";

function NewCardPage() {
    const flashCards = useSelector((state: RootState) => state.FLASH_CARD_STATE_NAME.flashCards);
    const {title, dispatchTitle} = useTitle();

    const dispatch = useDispatch();
    const { error, isError, mutate } = useMutation({
        mutationFn: ({ title, flashCards} : {title: string, flashCards: FlashCardInfo[]}) => addNewFlashCardSet(title, flashCards),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['titles']});
        },
        onError: (e: Error) => {
            dispatch(addError(e.message));
        }
    })

    return (
        <div className='newcardpage'>
            <div>Create a new flashcard set</div>

            {isError && <div>{error!.message}</div>}

            <input type='text' placeholder="Enter a title" onChange={(e) => dispatchTitle(e.target.value)} value={title}/>

            {flashCards.map((flashCard, i) => {
                return (
                    <div key={i}>
                        <NewQuestionComponent id={flashCard.id} term={flashCard.term} definition={flashCard.definition}/>
                    </div>
                )
            })}

            <button className='btn btn-primary' onClick={() => dispatch(addCard())}>Add a Card</button>
            <button className='btn btn-info' onClick={() => mutate({title, flashCards})}>Create</button>
        </div>
    )
}

export default NewCardPage;