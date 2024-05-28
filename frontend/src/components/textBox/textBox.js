import React from 'react';
import './textBox.css';

const TextBox = ({ header, text, width = 'auto', height = '150px' }) => {
    const containerStyle = {
        width: width,
        height: height,
    };
    return (
        <div className="text-box-container" style={containerStyle}>
            <h2 className="text-box-header">{header}</h2>
            <div className="text-box-text" contentEditable={false}>{text}</div>
        </div>
    );
};

export default TextBox;
