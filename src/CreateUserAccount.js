import React, { useState } from 'react';

const CreateUserAccount = ({ createUserAccount }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const onSubmit = (ev) => {
        ev.preventDefault();
        createUserAccount({ username, password })
            .catch(ex => setError(ex.response.data.message));
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Create Account</h1>
            <div className='error'>{error}</div>
            <input value={username} onChange={ev => setUsername(ev.target.value)} />
            <input type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            <button>Create Account</button>
        </form>
    );
};

export default CreateUserAccount;