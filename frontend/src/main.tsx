import { StrictMode, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { CLIENT_ID } from './Utils/constants';

import store, { type RootState } from './Store/store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

const ErrorsComponent = lazy(() => import('./Components/ErrorsComponent'));
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const HomePage = lazy(() => import('./Pages/HomePage'))


function App() {
    const appState = useSelector((state: RootState) => state.appState.appState);
    const [PageToRender, setPageToRender] = useState<React.ComponentType>(LandingPage); 

    useEffect(() => {
        switch (appState) {
            case 'AUTH':
                setPageToRender(() => LandingPage);
                break;
            case 'MAIN':
                setPageToRender(() => HomePage);
                break;
            default:
                console.warn(`Unexpected appState: ${appState}. Defaulting to LandingPage.`);
                setPageToRender(() => LandingPage);
                break;
        }
    }, [appState]); 

    return (
      <>
        <ErrorsComponent/>
        <PageToRender />
      </>
    );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
