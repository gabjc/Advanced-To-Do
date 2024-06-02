import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [id]: value
        }));
    };


    const handleRegisterClick = () => {
        navigate('/register');
      };
    const handleSignInClick = () => {
        // TODO: get resposne from server to check if user is in database or not
        navigate('/');
        console.log('Sign In clicked', userDetails);
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
                    <label htmlFor='password' className='input-label'>Password</label>
                    <input
                        id='password'
                        type='password'
                        className='input-box'
                        value={userDetails.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='button-container'>
                    <div className= "signin-button" onClick={handleSignInClick}> Sign In </div>
                    <div className= "register-button" onClick={handleRegisterClick}> Register </div>
                </div>
            </div>
        </div>
    );
    


};

export default Login;
