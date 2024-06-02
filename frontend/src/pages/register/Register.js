import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleRegisterClick = () => {
        //TODO: send the registration data to the server
        navigate('/');
        console.log('Register clicked', userDetails);
    };

    return (
        <div className='main-container'>
            <h1 className='register-title'>Register</h1>
            <div className='register-container'>
                <div className='input-container'>
                    <label htmlFor='username' className='input-label'>Username</label>
                    <input
                        id='username'
                        type='text'
                        className='input-box'
                        value={userDetails.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='email' className='input-label'>Email</label>
                    <input
                        id='email'
                        type='email'
                        className='input-box'
                        value={userDetails.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='password' className='input-label'>Password</label>
                    <input
                        id='password'
                        type='password'
                        className='input-box'
                        value={userDetails.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='confirmPassword' className='input-label'>Confirm Password</label>
                    <input
                        id='confirmPassword'
                        type='password'
                        className='input-box'
                        value={userDetails.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='button-container'>
                    <div className='register-button' onClick={handleRegisterClick}> Register </div>
                </div>
            </div>
        </div>
    );
};

export default Register;


