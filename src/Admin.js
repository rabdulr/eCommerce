import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = ({ auth, createPromoCode }) => {
    const [users, setUsers] = useState([]);
    const [promoCodes, setPromoCodes] = useState([]);
    const [name, setName] = useState('');
    const [percentage, setPercentage] = useState(0);
    const [active, setActive] = useState();
    const [error, setError] = useState('');
    useEffect(() => {
        axios.get('/api/users', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })
            .then(response => setUsers(response.data));
    }, []);
    useEffect(() => {
        axios.get('/api/promoCodes')
            .then(response =>
                setPromoCodes(response.data)
            );
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        createPromoCode({ name, percentage, active })
            .then(() => {
                setError('');
                setName('');
                setPercentage('');
                setActive();
            })
            .catch(ex => setError(ex.response.data.message));
    };
    return (
        <div>
            <h1>Admin</h1>
            <div>
                <h2>Promo Codes</h2>
                <form onSubmit={onSubmit}>
                    Create Promo Code
                    <input value={name} onChange={(ev) => setName(ev.target.value)} />
                    <input value={percentage} onChange={(ev) => setPercentage(ev.target.value)} />
                    <input type="checkbox" value={active} onChange={(ev) => setActive(ev.target.checked)}></input>
                    <button>Create</button>
                </form>
                <ul>
                    {
                        promoCodes.map(code => {
                            return (
                                <li key={code.id}>
                                    Promo code name: {code.name}
                                    <br />
                                Percentage off: {code.percentage}
                                    <br />
                                Active: {code.active}
                                </li>
                            );
                        })
                    }
                </ul>
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