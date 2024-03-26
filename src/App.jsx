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

  );
}

export default App;
