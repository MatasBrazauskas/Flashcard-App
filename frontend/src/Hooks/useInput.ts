import { useDispatch } from 'react-redux';

import { addError, clearError } from '../Store/errorState';
import { updateCard } from '../Store/flashCardState';
import { type FlashCardProperties } from '../Utils/flashCardStatUtils';

function useInput(maxLength: number, errorMessage: string){
    const dispatch = useDispatch();

    const updateValue = (id: number, newValue: string, property: FlashCardProperties) => {
        if (newValue.length > maxLength) {
            dispatch(addError(errorMessage));
        }
        else if(newValue.length <= maxLength){
            dispatch(clearError(errorMessage));
        } 
        dispatch(updateCard({id, newValue, property}));
    };
    return updateValue;
}

export default useInput;