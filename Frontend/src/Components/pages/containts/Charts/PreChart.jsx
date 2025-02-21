import Modal from 'react-bootstrap/Modal';
import { Box, styled, Grid, Typography,Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';


const Component = styled(Grid)`
    display: flex;
    width: 100%;
    padding: 0% 2%;
    height: auto;
`;

const LComponent = styled(Grid)`
    text-align: center;
    color: hsl(214.86deg 100% 14.51%);
    height:auto;
    padding:2%;
`;

const RComponent = styled(Grid)`
    display: flex;
    height: auto;
`;

const CloseBtn = styled(`button`)`
    font-size: 18px;
    background-color: #f0eeee;
    color: black;
    font-weight: 700;
    width: 30px;
    text-align: center;
    border: 1px solid red;
    border-radius:5px;
    float:right;
    &:hover {
        background-color: red;
    }
`

const PreChart = ({ ...props }) => {
    const finaldata = props.finaldata;
    const data = props.data;
    const obj = props.obj;
    const [dataKey2, setDatakey2] = useState('')
    const [dataKey3, setDatakey3] = useState('')
    useEffect(()=>{
        // setDatakey2 ('quality');
        const setData = ()=>{
            if (obj.dataKey === 'availability' || obj.dataKey === 'oEE') {
                setDatakey2 ('quality');
    
                if (obj.dataKey === 'availability') {
                    setDatakey3 ('availAvg');
                } else {
                    setDatakey3('oEEAvg')
                }
        
            } else if (obj.dataKey === 'quality' || obj.dataKey === 'performance') {
                setDatakey2 ('availability')
                if (obj.dataKey === 'quality') {
                    setDatakey3 ('qualAvg')
                }
                else {
                    setDatakey3('perfAvg')
                }
            }
        }
            setData();
            // console.log("event")
    },[obj])
// console.log(finaldata[obj.dataKey])
    return (
        <Box>
            <Modal show={props.show} onHide={props.handleClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{

                }}

            >
                <Modal.Body style={{
                    height: 'auto', width: '100%', backgroundColor: '#f1f1f1',
                    boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 1px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)',
                }} >
                        <CloseBtn onClick={() => props.handleClose()}>
                            X
                        </CloseBtn>

                    <Component container spacing={2}>

                        <Grid item xs={11} sm={11} md={2.8}>
                            <LComponent>
                                <Box sx={{ display: "block", marginTop: '8%' }}>
                                    <Typography sx={{ textAlign: 'center', fontSize: "30px", fontWeight: '500', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>{obj?.title}</Typography>
                                </Box>
                                <Box sx={{ marginLeft: '2%', justifyContent: 'center' }}>
                                    <Typography sx={{ textAlign: 'center', fontSize: '59px', fontWeight: '600', justifyContent: 'center', marginTop: '16%', fontFamily: 'system-ui, sans-serif' }}>{finaldata?.[obj.dataKey]}%</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginTop: '28%' }}>
                                    <Box sx={{ width: '69px', height: '30px', backgroundColor: '#ffffff', borderRadius: '7px' }}>
                                        <Typography sx={{ fontSize: '14px', textAlign: 'center', fontWeight: '550', marginTop: '8%' }}>54 MTD</Typography>
                                    </Box>
                                    <Box sx={{ width: '69px', height: '30px', backgroundColor: '#ffffff', borderRadius: '9px', marginLeft: '5%' }}>
                                        <Typography sx={{ fontSize: '14px', textAlign: 'center', fontWeight: '550', marginTop: '8%' }}>81 YTD</Typography>
                                    </Box>
                                </Box>
                            </LComponent>
                        </Grid>
                        <Grid item xs={11} sm={11} md={8.8}>

                            <RComponent>
                                <ResponsiveContainer minWidth='200px' height={300} style={{ padding: '0%' }}>
                                    <LineChart
                                        minWidth='190px'
                                        data={data.dataPoints}
                                        margin={{ top: 40, right: 1, left: 5, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" style={{ fontSize: '10px' }} />
                                        <YAxis axisLine={false} style={{ fontSize: '10px' }} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey={obj.dataKey} stroke="hsl(214.86deg 100% 14.51%)" strokeWidth={2.5} activeDot={{ r: 5 }} />
                                        <Line type="monotone" dataKey={dataKey2} stroke="hsl(50.1deg 93.41% 48.78% / 68%)" strokeWidth={2.5} activeDot={{ r: 5 }} />
                                        {/* <Line type="monotone" dataKey={dataKey3} data={(obj != "") && obj.data.averages} stroke="#8884d885" strokeWidth={2.5} activeDot={{ r: 5 }} layout={'vertical'} /> */}
                                    </LineChart>
                                </ResponsiveContainer>
                            </RComponent>
                        </Grid>
                    </Component>
                </Modal.Body>
            </Modal>
        </Box>
    );
};

export default PreChart;
