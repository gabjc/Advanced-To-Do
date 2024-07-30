import React, { useState, useEffect } from 'react';
import './Timer.css';
const Timer = ({seconds,submitted, handleSubmit = null}) => {
    const [editable, setEditable] = useState(true);
    const [time, setTime] = useState('00:00');

    useEffect(() => {
        if (submitted && editable) {
            console.log('submitted');
            console.log(time);
            const timeInSeconds = convertTimeToSeconds(time);
            console.log(timeInSeconds);
            handleSubmit(timeInSeconds);
            setEditable(false);

        }
    }, [submitted]);

    const convertTimeToSeconds = (time) => {
        
        const [minutes, seconds] = time.split(':');
        return parseInt(minutes) * 60 + parseInt(seconds);
    }; 

    const handleInput = (event) => {
        if(!editable){
            return;
        }
        setTime(event.target.innerText);

    }
    const formatTime = (sec) => {
        if(editable){
            sec = time;
            return sec;
        }
    
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='TimerBox'>
            <h1
            className='TimerText' 
            suppressContentEditableWarning={true}
            contentEditable={editable}
            onInput={handleInput}>{formatTime(seconds)}</h1>
        </div>
    );
};

export default Timer;
