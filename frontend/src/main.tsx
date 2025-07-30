import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CLIENT_ID } from './Utils/constants';
import store from './Store/store';

import { Provider } from 'react-redux';

import { LANDING_PAGE_URL, MAIN_PAGE_URL, HOME_PAGE_URL, LIBRARY_PAGE_URL, NEW_CARD_PAGE_URL } from './Utils/constants';

const LandingPage = lazy(() => import('./Pages/LandingPage'));
const MainPage = lazy(() => import('./Pages/MainPage'));

const HomeComponent = lazy(() => import('./Pages/HomePage'));
const LibraryComponent = lazy(() => import('./Pages/LibraryComponent')); 
const NewCardComponent = lazy(() => import('./Pages/NewCardPage'));

function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path={LANDING_PAGE_URL} element={<LandingPage />} />
        <Route path={MAIN_PAGE_URL} element={<MainPage />}>
          <Route path={HOME_PAGE_URL} element={<HomeComponent />} />
          <Route path={LIBRARY_PAGE_URL} element={<LibraryComponent />} />
          <Route path={NEW_CARD_PAGE_URL} element={<NewCardComponent />} />
          <Route index element={<Navigate to={HOME_PAGE_URL} />} />
        </Route>
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
