import React, { useState, useEffect } from 'react';
import './Timer.css';

// Component for the input box where the user can enter the time in seconds
const TimerInputBox = ({ seconds, setSeconds = null }) => {
  return (
    <div className='TimerInputBox'>
      <input
        type='text'
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        maxLength={5} // Restricts length to 5 characters (XX:XX)
        placeholder='MM:SS'

      />
    </div>
  );
};

// Main Timer component
const Timer = ({ seconds, submitted, handleSubmit = null }) => {
  const [editable, setEditable] = useState(true); // State to track if the timer is editable or not
  const [time, setTime] = useState('00:00'); // State to store the time in HH:MM format
  

  useEffect(() => {
    // useEffect hook to handle the submission of the timer
    console.log("submitted", submitted);
    if (submitted) {
      const timeInSeconds = convertTimeToSeconds(time); // Convert the time to seconds
      handleSubmit(timeInSeconds); // Call the handleSubmit function with the time in seconds
      setEditable(false); // Set editable to false to make the timer non-editable
    }
  }, [submitted]);

  // Function to convert the time in HH:MM format to seconds
  const convertTimeToSeconds = (time) => {
    const [minutes, seconds] = time.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds);
  };

  // Event handler for handling user input in the timer
  const handleInput = (event) => {
    if (!editable) {
      return; // If the timer is not editable, do nothing
    }
    const value = event.target.value;

    // Only allow digits and colon, and ensure the format is XX:XX
    const formattedTime = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    if (formattedTime.length <= 4) {
        const minutes = formattedTime.slice(0, 2).padStart(2, '0');
        const seconds = formattedTime.slice(2, 4).padStart(2, '0');
        setTime(`${minutes}:${seconds}`);
    }
    
  };

  // Function to format the time in seconds to HH:MM format
  const formatTime = (sec) => {
    if (editable) {
      sec = time; // If the timer is editable, use the time state value
      return sec;
    }

    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='TimerBox'>
      {editable && <TimerInputBox seconds={time} setSeconds={setTime} />}
      {!editable && <h1 className='TimerText'>{formatTime(seconds)}</h1>}
    </div>
  );
};

export default Timer;