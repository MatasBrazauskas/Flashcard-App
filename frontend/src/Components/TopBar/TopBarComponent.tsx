import { useNavigate, useLocation } from "react-router-dom";

import { HOME_PAGE_URL, LIBRARY_PAGE_URL, NEW_CARD_PAGE_URL } from "../../Constants/constants";
import { NAME, PICTURE, PICTURES_HEIGHT} from "../../Constants/constants";

import './TopBarStyle.css';
import { useDispatch } from "react-redux";
import { clearAllErrors } from "../../Store/errorState";

function TopBarComponent() {

    const navigation = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const name = localStorage.getItem(NAME);
    const pictureUrl = localStorage.getItem(PICTURE);

    const switchPages = (url: string) => {

        if(!location.pathname.includes(url)){
            dispatch(clearAllErrors());
            navigation(url);
        }
    }

    const nameBasedOnURLS = (url: string) => {
        let name = url;
        return name;
    }

    return (
        <div className='topbar'>
            <div className='links'>
                <div onClick={() => switchPages(HOME_PAGE_URL)}>{nameBasedOnURLS(HOME_PAGE_URL)}</div>
                <div onClick={() => switchPages(LIBRARY_PAGE_URL)}>{nameBasedOnURLS(LIBRARY_PAGE_URL)}</div>
                <div onClick={() => switchPages(NEW_CARD_PAGE_URL)}>{nameBasedOnURLS(NEW_CARD_PAGE_URL)}</div>
            </div>

            <div className='profile'>
                <img alt='Profile picture' src={pictureUrl!} height={PICTURES_HEIGHT}/>
                <div>{name}</div>
            </div>
            <br></br>
        </div>
    );
}

export default TopBarComponent;