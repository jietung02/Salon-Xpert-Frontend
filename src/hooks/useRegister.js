import { useState } from 'react';
import { registerUser } from '../services/authService';


export const useRegister = () => {
    const [userData, setUserData] = useState({
        username: null,
        password: null,
        email: null,
        name: null,
        gender: null,
        birthdate: null,
        contact: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await registerUser(userData);
            return;

        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { userData, loading, error, handleChange, handleSubmit };

};










