import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../Store/store';

async function addNewFlashCardSet(title: string){

    const flashCardArray = useSelector((state: RootState) => state.FLASH_CARD_STATE_NAME);

    try{

        //const [first, second] = Promise.all(axios.post());
    }
    catch (e){
        console.log(e);
    }
}

export default addNewFlashCardSet;