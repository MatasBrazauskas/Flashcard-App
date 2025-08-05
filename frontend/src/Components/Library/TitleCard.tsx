import useSwitchPage from '../../Hooks/useSwitchPage';

import './TitleStyle.css';

type TitleCardProps = {
    title: string,
    deleteCard: (title: string) => Promise<void>;
}

function TitleCard ({title, deleteCard} : TitleCardProps) {

    const { switchPages } = useSwitchPage();
        
    return (
        <div className='title'>
            <div onClick={() => switchPages(title)}>{title}</div>
            <button onClick={() => deleteCard(title)}>x</button>
        </div>
    )
}

export default TitleCard;