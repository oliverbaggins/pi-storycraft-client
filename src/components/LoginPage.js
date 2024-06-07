import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Icon from "../Assets/Icon.svg";
import './LoginPage.css';
import { TailSpin } from 'react-loader-spinner'; // Certifique-se de instalar essa dependência

const LoginPage = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration && new Date().getTime() > tokenExpiration) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('user');
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setIsLoading(true); // Iniciar carregamento
    try {
      const response = await fetch('https://pi-storycraft-server.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
        } else {
          throw new Error(errorData.message || 'Erro desconhecido. Tente novamente mais tarde.');
        }
      }

      const result = await response.json();
      const tokenExpirationTime = 3600 * 1000; // 1 hora em milissegundos
      const expirationDate = new Date().getTime() + tokenExpirationTime;

      localStorage.setItem('token', result.token);
      localStorage.setItem('tokenExpiration', expirationDate);

      // Requisição para obter informações do usuário
      const userResponse = await fetch('https://pi-storycraft-server.onrender.com/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${result.token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Falha ao obter informações do usuário. Tente novamente mais tarde.');
      }

      const userData = await userResponse.json();
      localStorage.setItem('user', JSON.stringify(userData));

      setSignedUp(true);

      // Configura a remoção do token após a expiração
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('user');
      }, tokenExpirationTime);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false); // Parar carregamento
      setFormData({
        email: '',
        password: ''
      });
    }
  };

  if (signedUp) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <TailSpin
          height="50"
          width="50"
          color="#3852FF"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="login-container">
      <img className='IconImg' src={Icon} alt='Icon'/>
      <h1 className="login-title">Fazer Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder='Digite seu e-mail'
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            placeholder='Digite sua senha'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="login-button primary" type="submit">Fazer Login</button>
      </form>
      <p className="signup-text">Não tem uma conta? <Link to="/signup">Criar Conta</Link></p>
    </div>
  );
};

export default LoginPage;
