import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [values, setValues] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${localStorage.getItem('userid')}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    const handleUpdate = () => {
        axios.put('http://localhost:5000/user', { values}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                console.log(response.data);
                setUser(prevUser => ({ ...prevUser,...values }));
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>

<h2 style={{ color: 'blue', fontSize: '50px', marginBottom: '20px', borderBottom: '2px solid blue', paddingBottom: '10px' }}>Welcome, {user.username}!</h2>
<div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
    <h2 style={{ color: 'green', marginBottom: '10px' }}>Email: {user.email}</h2>
    <h2 style={{ color: 'green', marginBottom: '10px' }}>Phone-no: {user.phoneNumber}</h2>
    <h2 style={{ color: 'green', marginBottom: '10px' }}>Username: {user.username}</h2>
    <h2 style={{ color: 'green', marginBottom: '20px' }}>Date-of-birth: {user.dob}</h2>
    <div style={{ marginBottom: '20px' }}>
        <label htmlFor="newUsername" style={{ display: 'block', marginBottom: '5px', color: 'blue' }}>New Username:</label>
        <input type="text" id="newUsername" value={values.username} onChange={e => setValues({...values,username:e.target.value})} style={{ padding: '10px', marginRight: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }} />
        <label htmlFor="newUsername" style={{ display: 'block', marginBottom: '5px', color: 'blue' }}>New PhoneNO:</label>
        <input type="text" id="newUsername" value={values.phoneNumber} onChange={e => setValues({...values,phoneNumber:e.target.value})} style={{ padding: '10px', marginRight: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }} />
        <label htmlFor="newUsername" style={{ display: 'block', marginBottom: '5px', color: 'blue' }}>New Date of Birth:</label>
        <input type="date"  id="newUsername" value={values.dob} onChange={e => setValues({...values,dob:e.target.value})} style={{ padding: '10px', marginRight: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }} />
        <button onClick={handleUpdate} style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
    </div>
</div>
        </div>
    );
};

export default Dashboard;
