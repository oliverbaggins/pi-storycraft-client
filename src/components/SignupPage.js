import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Icon from "../Assets/Icon.svg";
import './LoginPage.css';
import { TailSpin } from 'react-loader-spinner'; // Certifique-se de instalar essa dependência

const SignupPage = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch('https://pi-storycraft-server.onrender.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          throw new Error('Dados inválidos. Por favor, verifique as informações fornecidas.');
        } else {
          throw new Error(errorData.message || 'Erro desconhecido. Tente novamente mais tarde.');
        }
      }

      const result = await response.json();
      console.log(result);
      setSignedUp(true);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false); // Parar carregamento
      setFormData({
        username: '',
        email: '',
        password: ''
      });
    }
  };

  if (signedUp) {
    return <Navigate to="/login" />;
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
      <h1 className="login-title">Criar Conta</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome de Usuário:</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            placeholder='Digite seu nome de usuário' 
            onChange={handleInputChange} 
            required
          />
        </div>
        <div className="form-group">
          <label>E-mail:</label>
          <input 
            type="email" 
            name="email"
            placeholder='Digite seu e-mail' 
            value={formData.email} 
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
        <button className="login-button primary" type="submit">Criar Conta</button>
      </form>
      <p className="signup-text">Já tem uma conta?<Link to="/login"> Fazer Login</Link></p>
    </div>
  );
};

export default SignupPage;
