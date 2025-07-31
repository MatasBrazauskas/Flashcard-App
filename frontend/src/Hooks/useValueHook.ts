import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addError } from '../Store/errorState';

interface UseValueReturn {
    value: string;
    updateValue: (newValue: string) => void;
}

function useValue(initialValue: string, maxLength: number, errorMessage: string): UseValueReturn {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const dispatch = useDispatch();

    const updateValue = (newValue: string) => {
        if (newValue.length > maxLength) {
            dispatch(addError(errorMessage));
        } else {
            setCurrentValue(newValue); 
        }
    };

    return { value: currentValue, updateValue: updateValue };
}

export default useValue;