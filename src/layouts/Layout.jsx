import { createContext, useContext, useReducer } from 'react';
import AppRoutes from '../routes';
import { Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SideBar from './SideBar';

export default function Layout() {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="md:flex flex-col md:flex-row md:min-h-screen">
            {(isAuthenticated === true || isAuthenticated === 'guest') && <SideBar />}
            <div className="main-content bg-gray-100 text-black md:flex-1 min-h-screen overflow-y-auto">
                <AppRoutes />
            </div>
        </div>
    )
}