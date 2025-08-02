import { useReducer } from 'react';
import { TITLE_LENGTH_MAX } from '../Constants/newCardConst';

const titleReducer = (currTitle: string, title: string) => {
    if(TITLE_LENGTH_MAX < title.length){
        return currTitle;
    }
    return title;
}

function useTitle() {
    const [title, dispatchTitle] = useReducer(titleReducer, '');
    return { title, dispatchTitle};
}

export default useTitle;