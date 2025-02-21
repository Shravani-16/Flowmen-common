import React, { useEffect, useRef, useState } from 'react'
import CustomButton from './Button';
import { Box, Grid, Typography, styled } from '@mui/material';
import postDowntime from './postDowntime.js';

//CSS Component
const Component = styled(Box)`
    display: flex;
    flex-flow:column;
   align-items: center;
    
`
const TextTimmer = styled(Box)`
    margin: 3% 0% 4% 0%;
    border: 1px groove #565656;
    box-shadow: rgba(1, 3, 3, 0.18) 1px 4px 4px;
    width: 75%;
    border-radius: 12px;
    background-color: #b2b2b2b3;
`

function Timmer({ onDone }) {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const timer = useRef();

    useEffect(() => {
        if (running) {
            timer.current = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer.current);
    }, [running]);

    const handleDone = () => {
        if (running) clearInterval(timer.current);
        setRunning(false);
        onDone(time);
        setTime(0);
    };
    return (
        <Component>
            <TextTimmer>
                <Typography sx={{ fontSize: '57px', textAlign: "center" }}>{format(time)}</Typography>
            </TextTimmer>
            <Grid item lg={6} container justifyContent="space-between"sx={{ display: 'flex' }}>
                <Grid item lg={4} onClick={() => setRunning(true)} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CustomButton tittle="Start" />
                </Grid>
            
                <Grid item lg={4} onClick={handleDone} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CustomButton tittle='Stop' style={{ backgroundColor: '#ff6666', color: 'maroon', boxShadow: 'rgb(102 89 89 / 20%) 0 -25px 18px -14px inset, rgb(47 19 19 / 15%) 0 1px 2px, rgb(42 8 8 / 15%) 0 2px 4px, rgb(50 12 12 / 15%) 0 4px 8px, rgb(50 11 11 / 15%) 0 8px 16px, rgb(67 16 16 / 15%) 0 16px 32px' }}/>

                </Grid>
            </Grid>

        </Component >
    )
}

export default Timmer

const format = (time) => {
    let hours = Math.floor(time / 60 / 60 % 24);
    let minutes = Math.floor(time / 60 % 60);
    let seconds = Math.floor(time % 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}