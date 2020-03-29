import React, { useState, useEffect } from 'react';

const User = ({ userInfo }) => {
    const [ user, setUser ] = useState({})

    useEffect(()=> {
        if(userInfo){
            setUser(userInfo)
        }
    }, [userInfo]);

    return(
        <div>
            <h3>First Name:</h3>
                <span>{ user.firstName }</span>
            <h3>Last Name:</h3>
                <span>{ user.lastName }</span>
            <h3>Address:</h3>
                <span>{ user.address }</span>
            <h3>City:</h3>
                <span>{ user.city }</span>
            <h3>State:</h3>
                <span>{ user.state }</span>
            <h3>Zipcode:</h3>
                <span>{ user.zip }</span>
            <h3>Username:</h3>
                <span>{ user.username }</span>
        </div>
    )
};

export default User;