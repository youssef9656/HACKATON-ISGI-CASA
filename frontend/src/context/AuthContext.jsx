// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/', { withCredentials: true });
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};
