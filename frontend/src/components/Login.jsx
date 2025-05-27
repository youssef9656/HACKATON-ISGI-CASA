// src/components/Login.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);

  // 🔒 Rediriger si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      // Redirection selon rôle
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'manager':
          navigate('/manager');
          break;
        default:
          navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Rediriger selon le rôle
        switch (data.user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'manager':
            navigate('/manager');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setMessage(data.message || 'Erreur lors de la connexion');
      }
    } catch (err) {
      setMessage('Erreur réseau');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>

      <div>
        <label>Email</label><br />
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <label>Mot de passe</label><br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <button type="submit">Se connecter</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default Login;
