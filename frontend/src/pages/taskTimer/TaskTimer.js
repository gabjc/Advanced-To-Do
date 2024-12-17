import React, { useState, useEffect, useRef } from 'react';
import './TaskTimer.css';
import Timer from '../../components/timer/Timer';
import { useParams } from 'react-router-dom';
import TextBox from '../../components/textBox/textBox';

/*global chrome*/

// Function to get a task by its ID
const getTaskById = (taskId) => {
    const tasks = [
        { id: 1, name: 'Task 1', description: 'This is task 1', personalNotes: 'This is my personal note', startDate: '2024-05-23', endDate: '2024-05-24' },
        { id: 2, name: 'Task 2', description: 'This is task 2', personalNotes: 'This is my personal note', startDate: '2024-05-24', endDate: '2024-05-25' },
        { id: 3, name: 'Task 3', description: 'This is task 3', personalNotes: 'This is my personal note', startDate: '2024-05-25', endDate: '2024-05-26' },
        { id: 4, name: 'Task 4', description: 'This is task 4', personalNotes: 'This is my personal note', startDate: '2024-05-26', endDate: '2024-05-27' },
    ];
    return tasks.find(task => task.id === parseInt(taskId));
};

const TaskTimer = () => {
    const { taskId } = useParams(); // Get the taskId from the URL parameters
    const task = getTaskById(taskId); // Get the task object using the taskId

    // State variables
    const [seconds, setSeconds] = useState(0); // State variable to store the remaining seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false); // State variable to track if the timer is running0
    const [end, setEnd] = useState(false); // State variable to track if the timer has ended
    const [submit, setSubmit] = useState(false); // State variable to track if the timer has been submitted

    // Ref variables
    const timeRef = useRef({ time: 0 }); // Ref variable to store the initial time value
    const intervalRef = useRef(null); // Ref variable to store the interval reference
    const triggerAlert = () => {
        alert("This is an alert triggered from the Chrome extension!");
      };

    // Function to start the timer
    function startTimer(durationInSeconds) {

        console.log('This is the start of chrome');
        // Create an alarm that will trigger after the specified duration
        if (false) {
            console.log('chrome alarms');
            //chrome.alarms.create("timerAlarm", { delayInMinutes: durationInSeconds / 60 });
            //triggerAlert();
            
        }
        else{
            console.log("Thus is not chrome");
            
        }
    }

   const handleButtonClick = () => {
    chrome.runtime.sendMessage({ action: "trigger_alert" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
      } else if (response && response.status) {
        console.log(response.status);
      } else {
        console.error("No response received from the background script.");
      }
    });
}

    // Function to handle timer submission
    const handleTimerSubmit = (givenTime) => {
        console.log('submitted here');
        console.log(givenTime);
        timeRef.current.time = givenTime; // Store the given time in the ref variable
        setIsTimerRunning(true); // Start the timer
        setSeconds(timeRef.current.time); // Set the remaining seconds to the given time
        startTimer(timeRef.current.time); // Start the timer


        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current); // Clear any existing interval
        }

        intervalRef.current = setInterval(intervalDecrement, 1000); // Run the interval every 1 second
    };


    const intervalDecrement = () => {
        setSeconds(prevSeconds => {
            if (prevSeconds === 0) {
                endTimer(); // If the timer reaches 0, end the timer
                return prevSeconds;
            } else {
                return prevSeconds - 1; // Decrement the remaining seconds by 1
            }
        });
    };



    // Function to convert time in the format "mm:ss" to seconds
    const convertTimeToSeconds = (time) => {
        const [minutes, seconds] = time.split(':');
        return parseInt(minutes) * 60 + parseInt(seconds);
    };

    // Clean up the interval when the component is unmounted
    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);


    /* Button Functions */


    /* Start Timer */
    // Function to handle timer submission
    const onSubmit = () => {
            setSubmit(true); // Set the submit state to true
        };

    /* +5 Minutes */    
    // Function to handle adding 5 minutes to the timer
    const handleAddTime = () => {
        if (seconds < 3599) {
            setSeconds(prevSeconds => prevSeconds + 300); // Add 300 seconds (5 minutes) to the remaining seconds
            setIsTimerRunning(true); // Start the timer
            setEnd(false); // Reset the end state
        }
    };


    /* End Timer */
    // Function to end the timer
    const endTimer = () => {
        setEnd(true); // Set the end state to true
        setIsTimerRunning(false); // Stop the timer
        setSeconds(0); // Reset the remaining seconds to 0
        if (typeof chrome !== "undefined") {
            handleButtonClick();
        }
    };

    return (
        <div className='tasktimer-main-container'>
            <div className='task-timer-info'>
                <h1 className='timer-title'>{task.name}</h1>
                <TextBox header='Description' text={task.description} />
                <Timer seconds={seconds} submitted={submit} handleSubmit={handleTimerSubmit} />
            </div>
            {!isTimerRunning && !end && <button className='start-button' onClick={onSubmit}>Start Timer</button>}
            {isTimerRunning && (
                <div className='timer-buttons'>
                    <button className='extra-time-button' onClick={handleAddTime}>Add 5 minutes</button>
                    <button className='end-button' onClick={endTimer}>End Timer</button>
                </div>
            )}
            {end && <p>Time is up!</p>}
        </div>
    );
};

export default TaskTimer;
