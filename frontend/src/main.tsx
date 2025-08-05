import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CLIENT_ID } from './Constants/constants';
import store from './Store/store';

import { Provider } from 'react-redux';

import { OAUTH_PAGE_URL, MAIN_PAGE_URL, HOME_PAGE_URL, LIBRARY_PAGE_URL, NEW_CARD_PAGE_URL, PROFILE_PAGE_URL } from './Constants/constants';

const LandingPage = lazy(() => import('./Pages/OAuth/OAuthPage'));
const MainPage = lazy(() => import('./Pages/Main/MainPage'));

const HomeComponent = lazy(() => import('./Pages/Home/HomePage'));
const LibraryComponent = lazy(() => import('./Pages/Library/LibraryPage')); 
const NewCardComponent = lazy(() => import('./Pages/NewCard/NewCardPage'));

const queryClient = new QueryClient({
  defaultOptions : {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
});

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProfilePage from './Pages/Profile/ProfilePage';

function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path={OAUTH_PAGE_URL} element={<LandingPage />} />
        <Route path={MAIN_PAGE_URL} element={<MainPage />}>
          <Route path={HOME_PAGE_URL} element={<HomeComponent />} />
          <Route path={LIBRARY_PAGE_URL} element={<LibraryComponent />} />
          <Route path={NEW_CARD_PAGE_URL} element={<NewCardComponent />} />
          <Route path={PROFILE_PAGE_URL} element={<ProfilePage/>} />
          <Route index element={<Navigate to={HOME_PAGE_URL} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <ReactQueryDevtools initialIsOpen={false}/>
      </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
