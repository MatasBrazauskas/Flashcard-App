import './TitleStyle.css';

type TitleCardProps = {
    title: string,
    deleteCard: (title: string) => Promise<void>;
}

function TitleCard ({title, deleteCard} : TitleCardProps) {

    return (
        <div className='title'>
            <div onClick={() => alert()}>{title}</div>
            <button onClick={() => deleteCard(title)}>x</button>
        </div>
    )
}

export default TitleCard;