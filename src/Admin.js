import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = ({ auth }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/api/users', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })
            .then(response => setUsers(response.data));
    }, []);
    return (
        <div>
            <h1>Admin</h1>
            <div>
                <h2>Users</h2>
                <ul>
                    {
                        users.map(user => {
                            return (
                                <li key={user.id}>
                                    Username: {user.username}
                                    <br />
                                    Role: {user.role}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>

    );
};

export default Admin;