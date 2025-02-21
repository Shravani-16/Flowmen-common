import { Box, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";

//subcomponent
const Component = ({ tittle, volume, isVisi, para }) => {
    return (
        <Box sx={{ paddingBottom: '4%'}}>
            {/*<---------------tittle---------------> */}
            <Typography sx={{
                fontWeight: '600',
                fontSize: '12px'
            }}>{tittle}</Typography>
            {/*<------------PARAMETERS-----------> */}
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid item  md={8} lg={8}>
                    <Typography sx={{
                        color: 'hsl(214.86deg 100% 14.51%)',
                        fontWeight: '500',
                        fontSize: '22px'
                    }}>{volume}</Typography>
                </Grid>

                <Grid item md={4} lg={4}
                    sx={{
                        width: '60%',
                        display: 'flex',
                        backgroundColor: '#ffff',
                        height: '17px',
                        margin: '16px 28px 0px 25px',
                        padding: '0px 0px 3px 6px', borderRadius: '5px', alignContent: 'flex-end'
                    }}>
                    <Box sx={{ margin: '4% 0% 0% -3%', display: 'flex' }}>
                        <Box sx={{ borderRight: '1px solid black', }}>
                            <Typography sx={{ fontSize: '9px', padding: '0px 3px 0px 2px' }}>Ton</Typography>
                        </Box>
                        <Box sx={{ borderRight: '1px solid black', }}>
                            <Typography sx={{ fontSize: '9px', padding: '0px 3px 0px 2px' }}>Kg</Typography>
                        </Box>
                        <Box >
                            <Typography sx={{ fontSize: '9px', padding: '0px 3px 0px 2px' }}>Pcs</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/*<--------------END BOX--------------> */}
            <Box sx={{
                marginTop: '6px', height: 'auto',
            }}>
                <Box sx={{
                    backgroundColor: '#ffff',
                    width: '88%',
                    padding: '2px 0px 4px 0px',
                    borderRadius: ' 5px',
                    display: 'flex',
                    justifyContent: 'space-between',

                }}>
                    <Typography sx={{ float: 'left', fontSize: '10px', margin: '4px 0px 0px 4px' }}>{volume}</Typography>
                    {
                        para ?
                            <Typography sx={{ fontSize: '10px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>{para}</Typography>
                            :
                            <Typography sx={{ fontSize: '9px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>MTD</Typography>
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
                        <Typography sx={{ fontSize: '9px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>YTD</Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
}


const TPReport = ({data, noCavity}) => {

   
    return (
        <Box sx={{
            display: 'block',
            height: 'auto',
            marginTop: '1.5%',
            backgroundColor: '#f1f1f1',
            boxShadow: ' 0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 1px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)'
        }}>
            {/* <--------Tittle--------------> */}
            <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                <Typography sx={{
                    padding: '7px 4px 6px 7px',
                    fontSize: '16px',
                    color: '#385076',
                    fontWeight: '600'
                }}>Total Production Report</Typography>
                <Typography sx={{
                    fontSize: '16px',
                    color: '#385076',
                    fontWeight: '600'
                }}><InfoOutlinedIcon sx={{ fontSize: '17px', margin: '10px 11px 0px 0px' }} /></Typography>
            </Box>
            <Typography sx={{
                color: '2px solid #0000001c',
                margin: ' 1% 0% 2% 1%',
                width: '98%',
                borderBottom:'2px solid #0000004a'
            }}></Typography>
            {/*<------------Component---------------> */}
            <Grid columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }} sx={{
                width: '99%',
                height: 'auto',
                marginLeft: '12px !important',
                color: '#385076',
                display: 'flex'
            }}>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: '13vh' }}>
                    <Component tittle={'Expected Production'} volume={data?.uData?.[0].productionTarget || 0} isVisi={false} para={'capacity'} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: '13vh' }}>
                    <Component tittle={'Actual Production'} volume={((data?.plcData?.[0]?.Prodcount)*noCavity) || 0} isVisi={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: '13vh' }}>
                    <Component tittle={'Good Production'} volume={data?.uData?.[0]?.goodProduction || 0} isVisi={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: 'auto',}}>
                    <Component tittle={'Rejected Production'} volume={data?.uData?.[0].rejectedProduction || 0  } isVisi={true} />
                </Grid>
            </Grid>
        </Box>      
    )
};

export default TPReport;