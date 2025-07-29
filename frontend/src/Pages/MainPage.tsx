import { lazy, Suspense } from 'react';

import { useSelector } from 'react-redux';
import { type RootState } from '../Store/store';

import TopBarComponent from "../Components/TopBarComponent";
import ErrorsComponent from "../Components/ErrorsComponent";

const HomePage = lazy(() => import('./HomePage'));
const LibraryPage = lazy(() => import('./LibraryPage')); 
const NewCardPage = lazy(() => import('./NewCardPage'));

function MainPage() {

    const appState = useSelector((state: RootState) => state.appState.appState);

    const renderComponent = () => {
        switch(appState) {
            case 'HOME':
                return <HomePage/>
            case 'LIBRARY':
                return <LibraryPage/>
            case 'NEW':
                return <NewCardPage/>
        }
    }


    return (
        <>
            <TopBarComponent/>
            <ErrorsComponent/>
            <Suspense fallback={<div>Loading</div>}>
                {renderComponent()}
            </Suspense>

        </>
    )
}

export default MainPage;