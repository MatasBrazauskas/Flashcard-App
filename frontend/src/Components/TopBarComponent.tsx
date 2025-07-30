import { useNavigate } from "react-router-dom";

import { HOME_PAGE_URL, LIBRARY_PAGE_URL, NEW_CARD_PAGE_URL } from "../Utils/constants";

function TopBarComponent() {
    const navigation = useNavigate();

    return (
        <>
            <div onClick={() => navigation(HOME_PAGE_URL)}>Home</div>
            <div onClick={() => navigation(LIBRARY_PAGE_URL)}>Library</div>
            <div onClick={() => navigation(NEW_CARD_PAGE_URL)}>Add New Card</div>
        </>
    );
}

export default TopBarComponent;