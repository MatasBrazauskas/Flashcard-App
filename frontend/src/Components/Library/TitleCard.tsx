import useSwitchPage from '../../Hooks/useSwitchPage';
import { type UseMutateFunction } from '@tanstack/react-query';

import './TitleStyle.css';
import { MAIN_PAGE_URL, STUDY_PAGE_URL } from '../../Constants/constants';

type TitleCardProps = {
    title: string,
    id: number
    deleteCard: UseMutateFunction<string, Error, number, unknown>
}

function TitleCard ({title, id, deleteCard} : TitleCardProps) {

    const { switchPages } = useSwitchPage();
        
    return (
        <div className='title'>
            <div onClick={() => switchPages(`${MAIN_PAGE_URL}/${STUDY_PAGE_URL}/${title}/${id}`)}>{title}</div>
            <button onClick={() => deleteCard(id)}>x</button>
        </div>
    )
}

export default TitleCard;