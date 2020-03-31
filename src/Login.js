import React, { useState, useEffect } from 'react';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (ev) => {
    ev.preventDefault();
    login({ username, password })
      .catch(ex => setError(ex.response.data.message));
  }
  return (
    <form onSubmit={onSubmit} id="loginRoot">
      <h1>Login !!!</h1>
      <div className='error'>{error}</div>
      <input value={username} onChange={ev => setUsername(ev.target.value)} />
      <input type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
      <button>Login</button>
      <h3>
        <a href='#view=CreateUser'>
          Create a New User
        </a>
      </h3>
    </form>
  );
};

export default Login;