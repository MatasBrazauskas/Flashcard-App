import { StrictMode, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { CLIENT_ID, NAME } from './Utils/constants';
import store from './Store/store';

import { Provider } from 'react-redux';

import { LANDING_PAGE_URL, MAIN_PAGE_URL } from './Utils/constants';
import { addCredentials } from './Utils/oauthStateUtils';

const LandingPage = lazy(() => import('./Pages/LandingPage'));
const MainPage = lazy(() => import('./Pages/MainPage'))

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={LANDING_PAGE_URL} element={<LandingPage addCredentials={addCredentials}/>}/>
          <Route path={MAIN_PAGE_URL} element={<MainPage/>} />
        </Routes>
      </BrowserRouter>
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
