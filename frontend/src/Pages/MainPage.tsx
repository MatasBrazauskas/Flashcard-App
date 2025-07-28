import { useSelector } from "react-redux";
import { useState } from 'react';
import type { RootState } from "../Store/store";

function MainPage(){

    const [state, setState] = useState(useSelector((state: RootState) => state.appState.appState));

    return (<>
        <div>{localStorage.getItem('name')}</div>
    </>);
}

export default MainPage;