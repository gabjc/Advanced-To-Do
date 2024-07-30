import React, { useState, useEffect, useRef } from 'react';
import './TaskTimer.css';
import Timer from '../../components/timer/Timer';
import { useParams } from 'react-router-dom';

import TextBox from '../../components/textBox/textBox';
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

      
    const { taskId } = useParams();
    const task = getTaskById(taskId);    
    const [seconds, setSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [end, setEnd] = useState(false);
    const [submit, setSubmit] = useState(false);
    const timeRef = useRef({
        time : 0,
    });
    const intervalRef = useRef(null);

    const handleTimerSubmit = (givenTime) => {
        console.log('submitted here');
        console.log(givenTime);
        timeRef.current.time = givenTime;
        setIsTimerRunning(true);
        setSeconds(timeRef.current.time);
        if(intervalRef.current !== null){
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setSeconds(prevSeconds => {
               
                if (prevSeconds === 0) {
                    endTimer();
                 
                    return prevSeconds;
                    
                }
                else{
                    console.log(prevSeconds);
                    return prevSeconds - 1;
                }
                
            });
        }, 1000);
    };
    
    const onSubmit = () => {
        setSubmit(true);

    }

    const convertTimeToSeconds = (time) => {
        const [minutes, seconds] = time.split(':');
        return parseInt(minutes) * 60 + parseInt(seconds);
    };



    

    useEffect(() => {


        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
    


    const handleAddTime = () => {
            if(seconds < 3599){
                
                setSeconds(prevSeconds => prevSeconds + 300);
                setIsTimerRunning(true);
                setEnd(false);
                
            }
        
    };
    const endTimer = () => {
        setEnd(true);
        setIsTimerRunning(false);
        setSeconds(0);

    };

    return (
        <div className='main-container'>
            <div className='task-timer-info'>
            <h1 className='task-name'>{task.name}</h1>
            <TextBox header='Description' text={task.description} />
            <Timer seconds={seconds} submitted={submit} handleSubmit={handleTimerSubmit} />
            </div>
            {!isTimerRunning && !end &&  <button className='start-button' onClick={() => onSubmit()}>Start Timer</button>}
            {isTimerRunning && <div className='timer-buttons'>
            <button className='extra-time-button'onClick={handleAddTime}>Add 5 minutes</button>
            <button className='end-button' onClick={endTimer}>End Timer</button>
            </div>}
            {end && <p>Time is up!</p>}



        </div>
    );
};

export default TaskTimer;
