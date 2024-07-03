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

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const validateInputs = () => {
        const newErrors = {};

        // Check for empty fields
        if (!userDetails.username) {
            newErrors.username = 'Username is required';
        }

        if (!userDetails.email) {
            newErrors.email = 'Email is required';
        }

        if (!userDetails.password) {
            newErrors.password = 'Password is required';
        }

        if (!userDetails.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        }

        // Check for alphanumeric and symbols only, no spaces
        const alphanumericPattern = /^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?`~=-]*$/;

        if (userDetails.username && !alphanumericPattern.test(userDetails.username)) {
            newErrors.username = 'Username can only contain alphanumeric characters and symbols, no spaces';
        }

        if (userDetails.password && !alphanumericPattern.test(userDetails.password)) {
            newErrors.password = 'Password can only contain alphanumeric characters and symbols, no spaces';
        }

        // Check if passwords match
        if (userDetails.password !== userDetails.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterClick = () => {
        if (validateInputs()) {
            // Handle registration logic here
            navigate('/');
            console.log('Register clicked', userDetails);
        }
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
                        className={`input-box ${errors.username ? 'input-error' : ''}`}
                        value={userDetails.username}
                        onChange={handleInputChange}
                        required
                        pattern="^[a-zA-Z0-9!@#$%^&*()_+[\]{};':\\|,.<>/?`~=-]*$"
                    />
                    {errors.username && <span className='error-message'>{errors.username}</span>}
                </div>
                <div className='input-container'>
                    <label htmlFor='email' className='input-label'>Email</label>
                    <input
                        id='email'
                        type='email'
                        className={`input-box ${errors.email ? 'input-error' : ''}`}
                        value={userDetails.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <span className='error-message'>{errors.email}</span>}
                </div>
                <div className='input-container'>
                    <label htmlFor='password' className='input-label'>Password</label>
                    <input
                        id='password'
                        type='password'
                        className={`input-box ${errors.password ? 'input-error' : ''}`}
                        value={userDetails.password}
                        onChange={handleInputChange}
                        required
                        pattern="^[a-zA-Z0-9!@#$%^&*()_+[\]{};':\\|,.<>/?`~=-]*$"
                    />
                    {errors.password && <span className='error-message'>{errors.password}</span>}
                </div>
                <div className='input-container'>
                    <label htmlFor='confirmPassword' className='input-label'>Confirm Password</label>
                    <input
                        id='confirmPassword'
                        type='password'
                        className={`input-box ${errors.confirmPassword ? 'input-error' : ''}`}
                        value={userDetails.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword}</span>}
                </div>
                <div className='button-container'>
                    <div className='register-button' onClick={handleRegisterClick}> Register </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
