// src/components/Logout.jsx
import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        // Ajouter le token dans l'en-tête de la requête
        await axios.post(
          'http://127.0.0.1:8000/api/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Nettoyer tout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      axios.defaults.headers.common['Authorization'] = '';
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
      alert('Erreur lors de la déconnexion. Veuillez réessayer.');
    }
  };

  return <button onClick={handleLogout}>Déconnexion</button>;
}
