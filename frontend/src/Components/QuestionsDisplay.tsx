import type { Questions } from "../Utils/apiUtils";

function QuestionsDisplay({term, definition} : Questions){

    return (
        <div>
            <div>{term}</div>
            <div>{definition}</div>
        </div>
    )
}

export default QuestionsDisplay;