import { Box, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";


const Component = ({ tittle, volume, isVisi, para }) => {
    const [time, setTime] = useState({ hoursStr: 1, minutesStr: 1 });
    // console.log(time)
    // console.log(volume)
    const convertToHrMin = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const hourstr = hours > 0 ? hours : 0;
        const minstr = minutes > 0 ? minutes : 0;
        const secstr = secs > 0 ? secs : 0;
        
        const result = { hourstr, minstr, secstr };
        return result;
    };

    useEffect(() => {
        const Time = convertToHrMin(volume);

        setTime({ hoursStr: Time.hourstr, minutesStr: Time.minstr, secstr:Time.secstr });
    }, [volume]);
    // console.log(time)
    return (
        <Box sx={{ paddingBottom: '4%', }}>
            <Typography sx={{
                fontWeight: '600',
                fontSize: '13px',
                marginLeft: '4px'
            }}>{tittle}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{
                    color: 'hsl(214.86deg 100% 14.51%)',
                    fontWeight: '500',
                    fontSize: '25px',
                    display: 'flex',
                    margin: '0px 0px 0px 4px'
                }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: '500' }}>{time.hoursStr}</Typography>
                    <Typography sx={{ fontSize: '12px', marginTop: '13px' }}>h</Typography>&nbsp;
                    <Typography sx={{ fontSize: '25px', fontWeight: '500' }}>{time.minutesStr}</Typography>
                    <Typography sx={{ fontSize: '12px', marginTop: '13px' }}>m</Typography>&nbsp;
                    <Typography sx={{ fontSize: '25px', fontWeight: '500' }}>{time.secstr}</Typography>
                    <Typography sx={{ fontSize: '12px', marginTop: '13px' }}>s</Typography>
                </Box>

                <Box sx={{ alignContent: 'flex-end', margin: '16px 28px 0px 25px', padding: '0px 0px 3px 6px', }}>
                    <Typography sx={{ fontSize: '10px', color: '#089981', fontWeight: '700' }}>&#8593;10%</Typography>
                </Box>
            </Box>
            <Box sx={{ marginTop: '0px' }}>
                <Box sx={{
                    backgroundColor: '#ffff',
                    width: '88%',
                    padding: '2px 0px 4px 0px',
                    borderRadius: ' 5px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ float: 'left', fontSize: '10px', margin: '4px 0px 0px 4px' }}>30h</Typography>
                    {
                        para ?
                            <Typography sx={{ fontSize: '10px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>{para}</Typography>
                            :
                            <Typography sx={{ fontSize: '9px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>Expected</Typography>
                    }
                </Box>
                {
                    isVisi &&
                    <Box sx={{
                        backgroundColor: 'hsl(50.1deg 93.41% 48.78% / 68%)',
                        width: '88%',
                        padding: '2px 0px 4px 0px',
                        borderRadius: ' 5px',
                        marginTop: '7px',

                    }}>
                        <Typography sx={{ float: 'left', fontSize: '10px', margin: '4px 0px 0px 4px' }}>43.3M</Typography>
                        <Typography sx={{ fontSize: '9px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>Actual</Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
}

{/*<--------------Main Component-------------> */ }
const CycTime = ({ data }) => {
    const [cycleT, setCycleT] = useState(0)

    useEffect(() => {
        if (data?.plcData?.[0].DIN2 === 0) {
            setCycleT(data?.plcData?.[0].CycleT)
        }
        if( data?.plcData?.[0].prodcount === 0){
            setCycleT(0)
        }
    }, [data])
    // console.log(data.plcData?.[0].DIN2)
    return (
        <Box sx={{
            display: 'block',
            height: 'auto',
            marginTop: '1.5%',
            backgroundColor: '#f1f1f1',
            boxShadow: ' 0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 1px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)'
        }}>
            <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                <Typography sx={{
                    padding: '7px 4px 6px 8px',
                    display: 'flex'
                }}><Typography sx={{
                    fontSize: '16px',
                    color: '#385076',
                    fontWeight: '600',
                }}>Cycle Time</Typography><Typography sx={{
                    fontSize: '16px',

                }}>{':(Faster Than Expected)'}</Typography></Typography>
                <Typography sx={{
                    padding: '7px 6px 0px 0px',
                    fontSize: '16px',
                    color: '#385076',
                    fontWeight: '600'
                }}><InfoOutlinedIcon sx={{ fontSize: '17px', margin: '7px 6px 0px 0px' }} /></Typography>
            </Box>
            <Typography sx={{
                color: '2px solid #0000001c',
                margin: ' 1% 0% 2% 1%',
                width: '98%',
                borderBottom: '2px solid #0000004a'
            }}></Typography>
            <Grid columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }} sx={{
                width: '99%',
                height: 'auto',
                marginLeft: '12px !important',
                color: '#385076',
                display: 'flex'
            }}>
                <Grid item xs={12} sm={12} md={6} lg={3} >
                    <Component tittle={'Job_034'} volume={cycleT} isVisi={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} >
                    <Component tittle={'Job_035'} volume={92557} isVisi={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} >
                    <Component tittle={'Job_036'} volume={88675} isVisi={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Component tittle={'Job_037'} volume={3882} isVisi={true} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default CycTime;