// https://www.youtube.com/watch?v=3yaHWZdH0FM

// create a custom hooks for callling the service.js api 

import { useState } from 'react';
import { loginUser, guestLogin } from '../services/authService';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);

        try {
            const userData = await loginUser(credentials);
            return userData;

        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);

        }

    }
    return { login, loading, error };
};

export const useGuest = () => {
    const guestAuth = async () => {
        try {
            const guestData = await guestLogin();
            return guestData;

        } catch (error) {
            console.log(error.message)
        }
    }
    return { guestAuth };
}







