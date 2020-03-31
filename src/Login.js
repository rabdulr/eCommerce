import React, { useState } from 'react';

const Login = ({ login, guestSignOn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (ev) => {
    ev.preventDefault();
    if(!password && !username){
      guestSignOn();
    } else {
      login({ username, password })
        .catch(ex => setError(ex.response.data.message));

    }
  }
  return (
    <div>
      <form onSubmit={onSubmit} id="loginRoot">
        <h1>Login !!!</h1>
        <div className='error'>{error}</div>
        <input value={username} onChange={ev => setUsername(ev.target.value)} />
        <input type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
        <button disabled={!password && !username}>Login</button>
      <h3>
        <a href='#view=CreateUser'>
          Create a New User
        </a>
        <br />
        <button>Continue as Guest</button>
      </h3>
      </form>
    </div>
  );
};

export default Login;