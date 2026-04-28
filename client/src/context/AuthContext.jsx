import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            role: localStorage.getItem('role')
        };

        if (token && userData.id) {
            setUser(userData);
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user._id);
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('role', data.user.role);
        setUser({
            id: data.user._id,
            name: data.user.name,
            role: data.user.role
        });
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
