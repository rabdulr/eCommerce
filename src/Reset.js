import React, { useState, useEffect } from 'react';

const Reset = ({ resetPassword }) => {
    const [ currentPass, setCurrentPass ] = useState('');
    const [ newPass, setNewPass ] = useState('');
    const [ confirmNewPass, setConfirmNewPass ] = useState('');
    const [ error, setError ] = useState('')

    const onSubmit = (ev) => {
        ev.preventDefault();
        if( newPass !== confirmNewPass) {
            setError('Passwords do not match');
            return;
        }
        const credentials = { password: currentPass, newPass};
        resetPassword(credentials)
            .then( () => {
                alert('Password is reset');
                window.location.hash='#view=user';
            })
            .catch(ex=> {
                alert('Current password is incorrect');
            })
            setCurrentPass('');
            setNewPass('');
            setConfirmNewPass('');
    }


    return(
        <form onSubmit={(ev)=> onSubmit(ev)}>
            <label>Current Password: <input type='password' onChange={ev => setCurrentPass(ev.target.value)} value={currentPass} /> </label>
            <label>New Password: <input type='password' onChange={ev => setNewPass(ev.target.value)} value={ newPass }/> </label>
            <label>Confirm New Password: <input type='password' onChange={ev => setConfirmNewPass(ev.target.value)} value={ confirmNewPass } /> </label>
            <button>Update Password</button>
            {
                error
            }
        </form>
    )
};

export default Reset;
