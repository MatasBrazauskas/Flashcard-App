import { StrictMode, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { CLIENT_ID } from './Utils/constants';
import store from './Store/store';

import { Provider } from 'react-redux';

import { NAME } from './Utils/constants';
import { addCredentials } from './Utils/oauthStateUtils';

const LandingPage = lazy(() => import('./Pages/LandingPage'));
const MainPage = lazy(() => import('./Pages/MainPage'))


function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const informationAbsent = localStorage.getItem(NAME) === null;
        setLoggedIn(!informationAbsent);
    }, []);

    return (
    <>
        { loggedIn ? <MainPage/> : <LandingPage addCredentials={addCredentials} setLoggedIn={setLoggedIn}/> }
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
