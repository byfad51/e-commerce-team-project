import React, { useState } from 'react';




const AuthForm = ({ type }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/auth/${type}`, { method:'POST', body:JSON.stringify({username,password})}).then(x=>x.json());
      localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="auth-form">
      <h2>{type === 'login' ? 'Log In' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">{type === 'login' ? 'Log In' : 'Register'}</button>
      </form>
    </div>
  );
};

export const Login = () => <AuthForm type="login" />;

export const Register = () => <AuthForm type="register" />;