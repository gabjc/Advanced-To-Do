import React, { useRef } from 'react';
import './SignIn.css';
import TextBox from '../../components/textBox/textBox';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const userRef = useRef({
        username: '',
        password: '',
    });

    const handleTextChange = (id, newText) => {
        // Directly updating the ref object
        userRef.current[id] = newText;
    };

    const handleRegisterClick = () => {
        navigate('/register');
      };
    const handleSignInClick = () => {
        navigate('/');
    };

    return (
        <div className='main-container'>
            <h1 className='login-title'>Login</h1>
            <div className='sign-in-container'>
                <TextBox id='username' header='Username' text={userRef.current.username} editable={true} onTextChange={handleTextChange} />
                <TextBox id='password' header='Password' text={userRef.current.password} editable={true} onTextChange={handleTextChange} />
                <div className='button-container'>
                    <div className= "signin-button" onClick={handleSignInClick}> Sign In </div>
                    <div className= "register-button" onClick={handleRegisterClick}> Register </div>
                </div>
            </div>
            
        </div>
    );
    


};

export default Login;
