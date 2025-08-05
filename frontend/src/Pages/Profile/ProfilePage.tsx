import { useNavigate } from "react-router-dom";

import './ProfileStyle.css';

function ProfilePage(){

    const navigation = useNavigate();
   
    const logOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigation('/');
    }

    return (
        <div className='container'>
            <form onSubmit={() => logOut()}>
                <div>Log out of account</div>
                <div>
                    <button type='submit'>Log out</button>
                </div>
            </form>
        </div>
    )
}

export default ProfilePage;