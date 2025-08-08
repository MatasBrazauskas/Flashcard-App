import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CLIENT_ID, STUDY_PAGE_URL } from './Constants/constants';
import store from './Store/store';

import { Provider } from 'react-redux';

import { OAUTH_PAGE_URL, MAIN_PAGE_URL, HOME_PAGE_URL, LIBRARY_PAGE_URL, NEW_CARD_PAGE_URL, PROFILE_PAGE_URL } from './Constants/constants';

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const OAuthPage = lazy(() => import('./Pages/OAuth/OAuthPage'));
const MainPage = lazy(() => import('./Pages/Main/MainPage'));

const HomeComponent = lazy(() => import('./Pages/Home/HomePage'));
const LibraryComponent = lazy(() => import('./Pages/Library/LibraryPage')); 
const NewCardComponent = lazy(() => import('./Pages/NewCard/NewCardPage'));

const ProfilePage = lazy(() => import('./Pages/Profile/ProfilePage'))
const StudyPage = lazy(() => import('./Pages/Study/StudyPage'));

export const queryClient = new QueryClient({
  defaultOptions : {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
});

function App() {
    return (
      <div className='main'>
        <BrowserRouter>
        <Routes>
          <Route path={OAUTH_PAGE_URL} element={<OAuthPage />} />
          <Route path={MAIN_PAGE_URL} element={<MainPage />}>
            <Route path={HOME_PAGE_URL} element={<HomeComponent />} />
            <Route path={NEW_CARD_PAGE_URL} element={<NewCardComponent />} />
            <Route path={PROFILE_PAGE_URL} element={<ProfilePage/>} />
            <Route path={LIBRARY_PAGE_URL} element={<LibraryComponent />}/>
            <Route path={`${STUDY_PAGE_URL}/:title/:id`} element={<StudyPage />}/>
            <Route index element={<Navigate to={HOME_PAGE_URL} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
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
