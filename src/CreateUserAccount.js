import React, { useState, useEffect } from 'react';

const CreateUserAccount = ({ createUserAccount }) => {
    let input;
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('')
    const [ zip, setZip ] = useState('');
    const [ state, setState ] = useState('');
    const [ testAddress, setTestAddress ] = useState({})
    const [ error, setError ] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(confirmPass !== password){
            setError('Passwords do not match')
            return;
        };
        createUserAccount({ username, password, firstName, lastName, address, city, zip, state })
            .catch(ex => setError(ex.response.data.message));
    }
    useEffect(()=>{
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', ()=>{
            setTestAddress(autocomplete.getPlace());
        });
    }, []);

    useEffect(()=>{
        if(Object.entries(testAddress).length !== 0){
            const {address_components} = testAddress;
            setAddress(`${address_components[0].short_name} ${address_components[1].short_name}`);
            setCity(`${address_components[2].short_name}`);
            setState(`${address_components[4].short_name}`);
            setZip(`${address_components[6].short_name}`);
        }
    }, [testAddress])

    return (
        <form onSubmit={onSubmit} id="createUserRoot">
            <h1>Create Account !!!</h1>
            <div className='error'>{error}</div>
            <input placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)} />
            <input placeholder='first name' value={firstName} onChange={ev => setFirstName(ev.target.value)} />
            <input placeholder='last name' value={lastName} onChange={ev => setLastName(ev.target.value)}/>
            <input style={{width: '100%'}} ref={el => input = el }/>
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