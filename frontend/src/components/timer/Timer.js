import React, { useState, useEffect } from 'react';
import './Timer.css';
const Timer = ({seconds}) => {


    

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='TimerBox'>
            <h1>{formatTime(seconds)}</h1>
        </div>
    );
};

export default Timer;
