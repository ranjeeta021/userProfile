// Register.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import './register.css'; // Import custom CSS file
import { useNavigate } from 'react-router-dom';

const Register = () => {
const navigate = useNavigate()
    const handleSubmit = (values, { setSubmitting }) => {
        axios.post('http://localhost:5000/register', values)
            .then(response => {
                console.log(response.data);
                navigate('/')
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="register-container" style={{backgroundColor:'purple' , minHeight: '500px', width:'50%',marginLeft:'25%' ,padding: '3px'}}>
            <h2 className="register-heading" style={{marginLeft: '40%'}}>Register</h2>
            <Formik
                initialValues={{ username: '', password: '', phoneNumber: '', email: '', dob: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    if (!values.phoneNumber) {
                        errors.phoneNumber = 'Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.dob) {
                        errors.dob = 'Required';
                    }
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {() => (
                   <Form style={{ maxWidth: '400px', margin: '0 auto' }}>
                   <div style={{ marginBottom: '10px' }} className="register-form-group">
                       <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                       <Field type="text" name="username" className="form-control" style={{ width: '100%', padding: '5px' }} />
                       <ErrorMessage name="username" component="div" className="text-danger" />
                   </div>
                   <div style={{ marginBottom: '10px' }} className="register-form-group">
                       <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                       <Field type="password" name="password" className="form-control" style={{ width: '100%', padding: '5px' }} />
                       <ErrorMessage name="password" component="div" className="text-danger" />
                   </div>
                   <div style={{ marginBottom: '10px' }} className="register-form-group">
                       <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
                       <Field type="tel" name="phoneNumber" className="form-control" style={{ width: '100%', padding: '5px' }} />
                       <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                   </div>
                   <div style={{ marginBottom: '10px' }} className="register-form-group">
                       <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                       <Field type="email" name="email" className="form-control" style={{ width: '100%', padding: '5px' }} />
                       <ErrorMessage name="email" component="div" className="text-danger" />
                   </div>
                   <div style={{ marginBottom: '10px' }} className="register-form-group">
                       <label htmlFor="dob" style={{ display: 'block', marginBottom: '5px' }}>Date of Birth</label>
                       <Field type="date" name="dob" className="form-control" style={{ width: '100%', padding: '5px' }} />
                       <ErrorMessage name="dob" component="div" className="text-danger" />
                   </div>
                   <button type="submit" className="btn btn-primary register-submit-btn" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}>Register</button>
               </Form>
               
                )}
            </Formik>
        </div>
    );
};

export default Register;
