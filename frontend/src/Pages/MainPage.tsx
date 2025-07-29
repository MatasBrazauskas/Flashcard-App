import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import TopBarComponent from "../Components/TopBarComponent";
import ErrorsComponent from "../Components/ErrorsComponent";

const HomeComponent = lazy(() => import('../Components/HomeComponent'));
const LibraryComponent = lazy(() => import('../Components/LibraryComponent')); 
const NewCardComponent = lazy(() => import('../Components/NewCardComponent'));

import { HOME_COMPONENT_URL, LIBRARY_COMPONENT_URL, NEW_CARD_COMPONENT_URL } from '../Utils/constants';

function MainPage() {
    return (
        <>
            <TopBarComponent/>
            <ErrorsComponent/>
            <Suspense fallback={<div>Loading</div>}>
                <Routes>
                    <Route path={HOME_COMPONENT_URL} element={<HomeComponent/>}/>
                    <Route path={LIBRARY_COMPONENT_URL} element={<LibraryComponent/>}/>
                    <Route path={NEW_CARD_COMPONENT_URL} element={<NewCardComponent/>}/>
                </Routes>
            </Suspense>

        </>
    )
}

export default MainPage;