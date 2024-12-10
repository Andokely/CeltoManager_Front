import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('sidebar-expanded');
    localStorage.removeItem('color-theme');
    localStorage.removeItem('data');
    localStorage.removeItem('username');
    localStorage.removeItem('dark-mode');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
