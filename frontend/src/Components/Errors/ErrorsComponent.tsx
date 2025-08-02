import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";

import './errorStyle.css';

function ErrorsComponent() {
    
    const errors = useSelector((state: RootState) => state.ERRORS_STATE_NAME.errors);

    return (
        <div>
            {errors.map((error, i) => {
                return <div className='item' key={i}>{error}</div>
            })}
        </div>
    )
}

export default ErrorsComponent;