import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from './fonction';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fonction pour récupérer l'utilisateur et son rôle depuis le token
  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = decodeToken(token); // Décodage du token
      const role = decodedToken.role; // Supposons que le rôle est dans "role"
      return { token, role };
    } catch (error) {
      console.error("Token invalide ou expiré:", error);
      return null;
    }
  };

  useEffect(() => {
    const userData = getUserFromToken();
    if (userData) {
      setUser(userData);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const login = (token) => {
    try {
      const decodedToken = decodeToken(token); 
      const role = decodedToken.role;

      localStorage.setItem('token', token);
      setUser({ token, role });
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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
