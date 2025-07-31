import { useNavigate, useLocation } from "react-router-dom";

import { HOME_PAGE_URL, LIBRARY_PAGE_URL, NEW_CARD_PAGE_URL } from "../../Utils/constants";
import { NAME, PICTURE, PICTURES_HEIGHT} from "../../Utils/constants";

import './TopBarStyle.css';

function TopBarComponent() {

    const navigation = useNavigate();
    const location = useLocation();

    const name = localStorage.getItem(NAME);
    const pictureUrl = localStorage.getItem(PICTURE);

    const switchPages = (url: string) => {

        if(!location.pathname.includes(url)){
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