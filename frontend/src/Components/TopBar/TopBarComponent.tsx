import { HOME_PAGE_URL, LIBRARY_PAGE_URL, NEW_CARD_PAGE_URL, PROFILE_PAGE_URL } from "../../Constants/constants";
import { NAME, PICTURE, PICTURES_HEIGHT} from "../../Constants/constants";

import useSwitchPage from "../../Hooks/useSwitchPage";
import './TopBarStyle.css';

function TopBarComponent() {

    const name = localStorage.getItem(NAME);
    const pictureUrl = localStorage.getItem(PICTURE);

    const  { switchPages } = useSwitchPage();

    return (
        <div className='topbar'>
            <div className='links'>
                <div onClick={() => switchPages(HOME_PAGE_URL)}>{HOME_PAGE_URL}</div>
                <div onClick={() => switchPages(LIBRARY_PAGE_URL)}>{LIBRARY_PAGE_URL}</div>
                <div onClick={() => switchPages(NEW_CARD_PAGE_URL)}>{NEW_CARD_PAGE_URL}</div>
            </div>

            <div className='profile'>
                <img alt='Profile picture' src={pictureUrl!} height={PICTURES_HEIGHT}/>
                <div onClick={() => switchPages(PROFILE_PAGE_URL)}>{name!}</div>
            </div>
            <br></br>
        </div>
    );
}

export default TopBarComponent;