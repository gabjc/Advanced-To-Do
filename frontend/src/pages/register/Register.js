import React, { useRef } from 'react';
import './Register.css';
import TextBox from '../../components/textBox/textBox';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const registerRef = useRef({
        username: '',
        password: '',
        email: '',
    });

    const handleTextChange = (id, newText) => {
        // Directly updating the ref object
        registerRef.current[id] = newText;
    };

    const handleSubmitClick = () => {
        navigate('/');
      };


    return (
        <div className='main-container'>
            <h1 className='register-title'>Register</h1>
            <div className='register-container'>
                <div className='text-box-container'>
                    <TextBox id='username' header='Username' text={registerRef.current.username} editable={true} onTextChange={handleTextChange} />
                </div>
                <div className='text-box-container'>
                    <TextBox id='password' header='Password' text={registerRef.current.password} editable={true} onTextChange={handleTextChange} />
                </div>
                <div className='text-box-container'>
                    <TextBox id='confirmPassword' header='Confirm Password' text={registerRef.current.confirmPassword} editable={true} onTextChange={handleTextChange} />
                </div>
                <div className='button-container'>
                    <div className='register-button' onClick={handleSubmitClick}> Register </div>
                </div>
            </div>
        </div>
    );
    


};

export default Register;
