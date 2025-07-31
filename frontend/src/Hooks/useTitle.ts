import { useReducer } from 'react';

const TITLE_LENGTH_MAX = 15;

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