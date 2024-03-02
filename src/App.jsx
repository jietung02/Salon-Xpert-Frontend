

import logo from './logo.svg';
import './App.css';
import Layout from './layouts/Layout';
import { useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Kuala_Lumpur');

function App() {
  const { isAuthenticated, role, permissions, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const authDataString = sessionStorage.getItem('authData');

    if (authDataString !== null && authDataString !== 'undefined') {
      const authData = JSON.parse(authDataString);
      dispatch({ type: 'RELOAD', payload: authData });
    }
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout />
      </LocalizationProvider>
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
