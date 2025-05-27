import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  const [message, setMessage] = useState(null);

  // ✅ Rediriger si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker token et utilisateur
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
        if (data.errors) {
          const errors = Object.values(data.errors).flat().join(' ');
          setMessage(`Erreur : ${errors}`);
        } else if (data.message) {
          setMessage(`Erreur : ${data.message}`);
        }
      }
    } catch (error) {
      setMessage('Erreur réseau, veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>

      <div>
        <label>Nom complet</label><br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Mot de passe</label><br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
      </div>

      <div>
        <label>Confirmer le mot de passe</label><br />
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
          minLength={8}
        />
      </div>

      <div>
        <label>Rôle</label><br />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">Utilisateur</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit">S'inscrire</button>

      {message && <p style={{ color: 'red' }}>{message}</p>}
    </form>
  );
}

export default RegisterForm;
