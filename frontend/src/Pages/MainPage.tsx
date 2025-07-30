import { Outlet } from "react-router-dom";
import { lazy } from "react";

const TopBarComponent = lazy(() => import("../Components/TopBarComponent"));
const ErrorsComponent = lazy(() => import("../Components/ErrorsComponent"));

function MainPage() {
    return (
        <>
            <TopBarComponent/>
            <ErrorsComponent/>
            <Outlet/> 
        </>
    )
}

export default MainPage;