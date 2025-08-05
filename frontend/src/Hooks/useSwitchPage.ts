import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { clearAllErrors } from "../Store/errorState";

function useSwitchPage(){

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const location = useLocation();

    const switchPages = (url: string) => {

        if(location.pathname.includes(url) === false){
            dispatch(clearAllErrors());
            navigation(url);
        }
    }

    return { switchPages }
}

export default useSwitchPage;