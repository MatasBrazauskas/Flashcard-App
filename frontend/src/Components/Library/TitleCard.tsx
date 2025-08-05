import useSwitchPage from '../../Hooks/useSwitchPage';

import './TitleStyle.css';
import { MAIN_PAGE_URL, STUDY_PAGE_URL } from '../../Constants/constants';

type TitleCardProps = {
    title: string,
    deleteCard: (title: string) => Promise<void>;
}

function TitleCard ({title, deleteCard} : TitleCardProps) {

    const { switchPages } = useSwitchPage();
        
    return (
        <div className='title'>
            <div onClick={() => switchPages(`${MAIN_PAGE_URL}/${STUDY_PAGE_URL}/${title}`)}>{title}</div>
            <button onClick={() => deleteCard(title)}>x</button>
        </div>
    )
}

export default TitleCard;