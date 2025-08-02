import { Outlet } from "react-router-dom";
import { lazy, useEffect } from "react";

import getJWTtoken from "../../APIs/getJWTtoken";
import { JWT, NAME } from "../../Constants/constants";

const TopBarComponent = lazy(() => import("../../Components/TopBar/TopBarComponent"));
const ErrorsComponent = lazy(() => import("../../Components/Errors/ErrorsComponent"));

function MainPage() {

    useEffect(() => {
        const name = localStorage.getItem(NAME);
        const getSetToken = async (name : string) : Promise<boolean> => {
            const token = await getJWTtoken(name);
            console.log(token);

            if(token !== null)
            {
                sessionStorage.setItem(JWT, token.token);
                return true;
            }
            return false;
        }

        getSetToken(name!);

    }, []);

    return (
        <>
            <TopBarComponent/>
            <ErrorsComponent/>
            <Outlet/> 
        </>
    )
}

export default MainPage;