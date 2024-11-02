import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { getBaseUrl } from '../utils/baseUrl.js';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${getBaseUrl()}/user/signup`, formData);
            setUser(response.data.user);
            console.log(response.data)
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const logIn = async (email, password, role) => {
        setLoading(true);
        try {
            const response = await axios.post(`${getBaseUrl()}/user/login`, { email, password, role });
            const { token } = response.data;
            Cookies.set('token', token);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message); // Log detailed error response
            throw error;
        } finally {
            setLoading(false);
        }
    };
    

    const logOut = async () => {
        setLoading(true);
        try {
            await axios.post(`${getBaseUrl()}/user/logout`);
            Cookies.remove('token');
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const token = Cookies.get('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${getBaseUrl()}/user/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
                Cookies.remove('token');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []); // Removed getBaseUrl from the dependency array

    const authInfo = { user, loading, logIn, createUser, logOut };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
