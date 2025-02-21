import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import styled from 'styled-components';
import CropFreeIcon from '@mui/icons-material/CropFree';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const Card = styled(Box)`
    box-sizing: border-box;
    height: auto;
    justify-content: center;
    alignItems: center;
    idth: 99%;
    padding-bottom: 0.5%;
    background-color: #f1f1f1; 
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 1px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12);
`;
const Component = styled(Grid)`
    display:flex;
    width: 98%;
    padding: 0% 0% 0% 2%;
    height: auto;
    margin-top:-2%;
`;

const LComponent = styled(Grid)`
    text-align: center;
    height:auto;
    color:hsl(214.86deg 100% 14.51%);
    margin-top: -2%;



`;
const RComponent = styled(Grid)`
    display: flex;
    height: 13vh;
`;



const Linechart = ({ ...props }) => {
    useEffect(()=>{
        
    })

    const PreviewChart = () => {
      
        props.setShow(true)
        props.setObj(
            {
                data: props.data,
                name: props.name,
                dataKey: props.dataKey,
                title: props.title,
                per: props.per
            }
        );

    }
    let dataKey2
    let dataKey3
    if (props.dataKey === 'availability' || props.dataKey === 'oEE') {
        dataKey2 = 'quality'
        if (props.dataKey === 'availability') {
            dataKey3 = 'availAvg'
        } else {
            dataKey3 = 'oEEAvg'
        }

    } else if (props.dataKey === 'quality' || props.dataKey === 'performance') {
        dataKey2 = 'availability'
        if (props.dataKey === 'quality') {
            dataKey3 = 'qualAvg'
        }
        else {
            dataKey3 = 'perfAvg'
        }
    }

    // const data = lineData();
    // console.log(props.data.averages)
    return (
        <Card>
            {/*<------------BUTTONS----------> */}
            <Box sx={{ display: 'flex', float: 'right', color: 'hsl(214.86deg 100% 14.51%)' }}>
                <IconButton onClick={PreviewChart}><CropFreeIcon sx={{ fontSize: '12px', fontWeight: '900' }} /></IconButton>
                <IconButton><MoreVertIcon sx={{ fontSize: '12px' }} /></IconButton>
            </Box>
            <Component columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                <LComponent item xs={12} sm={3} >
                    {/*<-------------TITTLE---------------> */}
                    <Box sx={{ display: "block", marginTop: '-6%' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: "15px", fontWeight: '700', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>{props.title}</Typography>
                    </Box>
                    <Box sx={{
                        marginLeft: '2%', justifyContent: 'center'
                    }}>
                        <Typography sx={{
                            textAlign: 'center', fontSize: '30px',
                            fontWeight: '600',
                            justifyContent: 'center',
                            marginTop: '2%',
                            fontFamily: 'system-ui, sans-serif'
                        }}>
                            {props.per}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginTop: '11%' }}>
                        <Box sx={{
                            width: '50px', height: '20px', backgroundColor: '#ffffff',
                            borderRadius: '7px',
                        }} ><Typography sx={{ fontSize: '10px', textAlign: 'center', fontWeight: '550', marginTop: '8%' }}>54 MTD</Typography></Box>
                        <Box sx={{
                            width: '50px', height: '20px', backgroundColor: '#ffffff',
                            borderRadius: '9px', marginLeft: '5%'
                        }} ><Typography sx={{ fontSize: '10px', textAlign: 'center', fontWeight: '550', marginTop: '8%', }}>81 YTD</Typography></Box>
                    </Box>
                </LComponent>

                <RComponent item xs={12} sm={9}>
                    <ResponsiveContainer minWidth='200px'>
                        <LineChart
                            minWidth='190px'
                            data={props.data.dataPoints}
                            margin={{ top: 2, right: 2, left: -20, bottom: 2 }}
                            style={{
                                height: '14vh',
                                display: 'block'
                            }}
                        >
                            <CartesianGrid strokeDasharray={"3 3"} vertical={false} />
                            <XAxis dataKey={name} style={{ fontSize: '10px' }} />
                            <YAxis axisLine={false} style={{ fontSize: '10px' }} />
                            <Tooltip />
                            
                            {/* <Line type="monotone" dataKey={dataKey3} data={props.data.averages} stroke="#8884d885" strokeWidth={2.5} activeDot={{ r: 5 }} layout={'vertical'} /> */}

                            <Line type="monotone" dataKey={props.dataKey}stroke="hsl(214.86deg 100% 14.51%)" strokeWidth={2.5} activeDot={{ r: 5 }} layout={'vertical'} />

                            <Line type="monotone" dataKey={dataKey2} stroke="hsl(50.1deg 93.41% 48.78% / 68%)" strokeWidth={2.5} activeDot={{ r: 5 }} layout={'vertical'} />


                            {/* <Line type="monotone" dataKey="oEEAvg" data={props.data.averages} stroke="rgba(153, 102, 255, 1)" strokeWidth={2} strokeDasharray="5 5" /> */}

                        </LineChart>
                    </ResponsiveContainer>
                </RComponent>


            </Component>

        </Card >
    );
};

export default Linechart;
