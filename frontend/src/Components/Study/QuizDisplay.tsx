import ReactCardFlip from "react-card-flip";
import { useContext, useState, useReducer } from "react";

import { UserContext } from "../../Pages/Study/StudyPage";
import { StudyContext } from "../../Pages/Study/StudyPage";

import './QuizStyle.css';

function QuizDisplay(){

    const questions = useContext(UserContext);
    const studyContext = useContext(StudyContext);

    if(studyContext === null) return;

    const {study, setStudy} = studyContext;

    const [flipped, setFliped] = useState(false);
    const [correctCount, incramentCorrectCount] = useReducer((state: number) => {
        return state + 1;
    }, 0);

    const [index, indexDispatch] = useReducer((state: number, action: 'INCREMENT' | 'DECREMENT') => {
        if (action === 'INCREMENT') {
            if(state + 1 >= questions.length) {
                setStudy(false);
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
            <div className='cont'>
                <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
                    <div onClick={() => setFliped(true)}>
                        {questions?.at(index)?.term}
                    </div>

                    <div onClick={() => setFliped(false)}>
                        {questions?.at(index)?.definition}
                    </div>
                </ReactCardFlip>
            </div>


            {!study && 
                <div className='buts'>
                    <div className='arrow'>
                        <button onClick={() => indexDispatch('DECREMENT')}>{'<'}</button>
                        <div>{index + 1} / {questions?.length}</div>
                        <button onClick={() => indexDispatch('INCREMENT')}>{'>'}</button>
                    </div>
                    <div className='study'>
                        <button onClick={() => setStudy(true)}>Study This Set</button>
                    </div>
                </div> 
            }

            {study &&
                <div className='temp'>
                    <button onClick={() => indexDispatch('INCREMENT')}>Incorrect</button>
                    <div>{correctCount} / {questions?.length}</div>
                    <button onClick={() => {indexDispatch('INCREMENT'), incramentCorrectCount()}}>Correct</button>
                </div>
            }

        </div>
    )
}

export default QuizDisplay;