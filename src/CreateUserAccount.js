import React, { useState } from 'react';

const CreateUserAccount = ({ createUserAccount }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ zip, setZip ] = useState('');
    const [ state, setState ] = useState('');
    const [ error, setError ] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(confirmPass !== password){
            setError('Passwords do not match')
            return;
        };
        createUserAccount({ username, password, firstName, lastName, address, zip, state })
            .catch(ex => setError(ex.response.data.message));
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Create Account</h1>
            <div className='error'>{error}</div>
            <input placeholder='first name' value={firstName} onChange={ev => setFirstName(ev.target.value)} />
            <input placeholder='last name' value={lastName} onChange={ev => setLastName(ev.target.value)}/>
            <input placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)} />
            <input placeholder='address' value={address} onChange={ev => setAddress(ev.target.value)} />
            <input placeholder='state' value={state} onChange={ev => setState(ev.target.value)} />
            <input placeholder='zip' value={zip} onChange={ev => setZip(ev.target.value)} />
            <input placeholder='password' type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            <input placeholder='confirm password' type='password' value={confirmPass} onChange={ev => setConfirmPass(ev.target.value)} />
            <button>Create Account</button>
            <h3>
                <a href='#'>
                    BACK
                </a>
            </h3>
        </form>
    );
};

export default CreateUserAccount;