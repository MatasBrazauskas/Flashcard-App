import ReactCardFlip from "react-card-flip";
import { useContext, useState, useReducer } from "react";

import { UserContext } from "../../Pages/Study/StudyPage";

function QuizDisplay(){

    const questions = useContext(UserContext);

    const [flipped, setFliped] = useState(false);
    const [studying, setStudying] = useState(false);
    const [correctCount, incramentCorrectCount] = useReducer((state: number) => {
        return state + 1;
    }, 0);

    const [index, indexDispatch] = useReducer((state: number, action: 'INCREMENT' | 'DECREMENT') => {
        if (action === 'INCREMENT') {
            if(state + 1 >= questions.length) {
                setStudying(false);
                
            }
            return state + 1 >= questions?.length! ? 0 : state + 1;
        }
        if (action === 'DECREMENT') {
            return state - 1 < 0 ? questions?.length! - 1 : state - 1;
        }
        return state;
    }, 0);



    return (
        <div>
            <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
                <div onClick={() => setFliped(true)}>
                    {questions?.at(index)?.term}
                </div>

                <div onClick={() => setFliped(false)}>
                    {questions?.at(index)?.definition}
                </div>
            </ReactCardFlip>


            {!studying && 
                <div>
                    <div>
                        <button onClick={() => indexDispatch('DECREMENT')}>{'<-'}</button>
                        <button onClick={() => indexDispatch('INCREMENT')}>{'->'}</button>
                    </div>
                    <div>
                        <button onClick={() => setStudying(true)}>Study This Set</button>
                    </div>
                </div> 
            }

            {studying &&
                <div>
                    <button onClick={() => indexDispatch('INCREMENT')}>Incorrect</button>
                    <button onClick={() => {indexDispatch('INCREMENT'), incramentCorrectCount()}}>Correct</button>
                </div>
            }

        </div>
    )
}

export default QuizDisplay;