// Login.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const handleSubmit = (values, { setSubmitting }) => {
        axios.post('http://localhost:5000/login', values)
            .then(response => {
                window.localStorage.setItem('token', response.data.token)
                window.localStorage.setItem('userid', response.data.userid)
                navigate('/dashboard')
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div style={{ backgroundColor: 'purple' , minHeight : '350px' , width:'50%' , marginLeft: '25%',padding:'3px' ,marginTop:'2%' }}>
            <h2 style={{ marginLeft: '50%' }}>Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
               <Form style={{ maxWidth: '400px', margin: '0 auto' }}>
    <div style={{ marginBottom: '10px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
        <Field type="text" name="email" style={{ width: '100%', padding: '5px' }} />
        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
    </div>
    <div style={{ marginBottom: '10px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
        <Field type="password" name="password" style={{ width: '100%', padding: '5px' }} />
        <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
    </div>
    <button type="submit" style={{ padding: '10px', marginRight: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Login</button>
    <button onClick={() => { navigate("/register") }} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}>Register</button>
</Form>

            </Formik>
        </div>
    );
};

export default Login;
