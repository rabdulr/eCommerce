import React, { useState, useEffect } from 'react';

const User = ({userInfo, logout}) => {
    const [ user, setUser ] = useState({})

    useEffect(()=> {
        if(userInfo){
            setUser(userInfo)
        }
    }, [userInfo]);

    return(
        <div>
            <h2>Account Information</h2>
            <p>Username: { user.username } </p>
            <p>First Name: { user.firstName } </p>
            <p>Last Name: { user.lastName } </p>
            <p>Address: { user.address } </p>
            <p>City: { user.city } </p>
            <p>State: { user.state } </p>
            <p>Zipcode: { user.zip } </p>
            <div>
                <button onClick={ logout }>Logout { user.firstName } { user.lastName } </button>
                <button onClick={() => window.location.hash='#view=reset'}>Reset Password</button>
            </div>
        </div>
    )
};

export default User;