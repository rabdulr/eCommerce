import React, { useState, useEffect } from 'react';

const Login = ({ login, guestSignOn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (ev) => {
    ev.preventDefault();
    login({ username, password })
      .catch(ex => setError(ex.response.data.message));
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className='error'>{error}</div>
        <input value={username} onChange={ev => setUsername(ev.target.value)} />
        <input type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
        <button>Login</button>
      </form>
      <h3>
        <a href='#view=CreateUser'>
          Create a New User
        </a>
        <br />
        <button onClick={ guestSignOn }>Continue as Guest</button>
      </h3>
    </div>
  );
};

export default Login;