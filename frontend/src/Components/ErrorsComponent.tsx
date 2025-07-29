import { useSelector } from "react-redux";
import { useState } from 'react';

import type { RootState } from "../Store/store";

function ErrorsComponent() {
    
    const [errors, _] = useState(useSelector((state: RootState) => state.errorsState.errors));

    return (
        <>
            {errors.map((error, ) => {
                <div>{error}</div>
            })}
        </>
    )
}

export default ErrorsComponent;