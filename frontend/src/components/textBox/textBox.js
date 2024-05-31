import React from 'react';
import './textBox.css';

const TextBox = ({ id, header, text,  editable = false, onTextChange = null, width = 'auto', height = '150px' }) => {
    const containerStyle = {
        width: width,
        height: height,
    };

    const handleInput = (event) => {
        if (!editable) {
            return;
        }
        if (onTextChange) {
            onTextChange(id, event.currentTarget.textContent);
        }
    };


    return (
        <div className="text-box-container" style={containerStyle}>
            <h2 className="text-box-header">{header}</h2>
            <div className="text-box-text" 
            contentEditable={editable}
            onInput={handleInput}
            >{text}</div>

        </div>
    );
};

export default TextBox;
