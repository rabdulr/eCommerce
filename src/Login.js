import React, { useState } from 'react';

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
      <form onSubmit={onSubmit} id="loginRoot">
        <h1>Login !!!</h1>
        <div className='error'>{error}</div>
        <input value={username} placeholder='username' onChange={ev => setUsername(ev.target.value)} />
        <input type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
        <button disabled={!password && !username}>Login</button>
      <h3>
      </h3>
      </form>
      <div className='header-bottom'>
      <a href='#view=CreateUser'>
          Create a New User
      </a>
      <button onClick={guestSignOn}>Continue as Guest</button>
      </div>        
    </div>
  );
};

export default Login;