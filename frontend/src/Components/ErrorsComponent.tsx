import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

function ErrorsComponent() {
    
    const errors = useSelector((state: RootState) => state.ERRORS_STATE_NAME.errors);

    return (
        <div>
            <div>ErrorComponent</div>
            {errors.map((error, i) => {
                return <div key={i}>{error}</div>
            })}
        </div>
    )
}

export default ErrorsComponent;