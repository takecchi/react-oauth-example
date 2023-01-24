import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Top from './pages';
import Header from './layouts/header';
import { useAuth } from './swr/auth';
import Home from './pages/home';

const Private = (props: { component: JSX.Element }): JSX.Element => {
  const { isLoading, loggedOut } = useAuth();
  const location = useLocation();

  return (
    <div>
      {isLoading ? (
        'loading...'
      ) : loggedOut ? (
        <Navigate to="/" state={{ from: location }} />
      ) : (
        props.component
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Top />} />
        <Route path={'/home'} element={<Private component={<Home />} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
