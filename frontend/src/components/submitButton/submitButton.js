import React from 'react';
import './submitButton.css';
const SubmitButton = ({ text,handleSubmit }) => {
    return (
        <button className='submit-button' onClick={handleSubmit}>
            {text}
        </button>
    );
};

export default SubmitButton;