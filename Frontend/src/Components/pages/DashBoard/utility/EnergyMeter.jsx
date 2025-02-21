import { Box, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


// Subcomponent
const Component = ({ title, volume, isVisi, para }) => {
    return (
        <Box sx={{ paddingBottom: '4%' }}>
            {/* Title */}
            <Typography sx={{ fontWeight: '600', fontSize: '12px' }}>{title}</Typography>
            {/* Parameters */}
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid item md={7} lg={7}>
                    <Typography sx={{
                        color: 'hsl(214.86deg 100% 14.51%)',
                        fontWeight: '500',
                        fontSize: '28px',
                        padding: '5px 0px 0px 3px'
                    }}>{volume}</Typography>
                </Grid>
                <Grid item md={3} lg={3} sx={{
                    width: '60%',
                    display: 'flex',
                    backgroundColor: '#ffff',
                    height: '17px',
                    margin: '20px 39px 0px 2px',
                    padding: '0px 7px 4px 10px',
                    borderRadius: '5px',
                    alignContent: 'flex-end'
                }}>
                    <Box sx={{ margin: '4% 0% 0% -3%', display: 'flex' }}>
                        <Box sx={{ borderRight: '1px solid black' }}>
                            <Typography sx={{ fontSize: '9px', padding: '0px 3px 0px 2px', fontWeight:700 }}>kW</Typography>
                        </Box>
                        <Box sx={{ borderRight: '1px solid black' }}>
                            <Typography sx={{ fontSize: '9px', padding: '0px 3px 0px 2px', fontWeight:700 }}>kVA</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '9px', padding: '0px 3px 0px 2px', fontWeight:700 }}>kVAr</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* End Box */}
            <Box sx={{ marginTop: '6px', height: 'auto' }}>
                <Box sx={{
                    backgroundColor: '#ffff',
                    width: '88%',
                    padding: '2px 0px 4px 0px',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography sx={{ float: 'left', fontSize: '10px', margin: '4px 0px 0px 4px' }}>{volume}</Typography>
                    <Typography sx={{ fontSize: '10px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>{para || 'MTD'}</Typography>
                </Box>
                {isVisi && (
                    <Box sx={{
                        backgroundColor: 'hsl(50.1deg 93.41% 48.78% / 68%)',
                        width: '88%',
                        padding: '2px 0px 4px 0px',
                        borderRadius: '5px',
                        marginTop: '7px',
                    }}>
                        <Typography sx={{ float: 'left', fontSize: '10px', margin: '4px 0px 0px 4px' }}>43.3M</Typography>
                        <Typography sx={{ fontSize: '9px', textAlign: 'right', margin: '4px 4px 0px 0px' }}>YTD</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const EnergyMeter = ({ data, Edata }) => {
    // console.log(data.kWh)
    return (
        <Box sx={{
            display: 'block',
            height: 'auto',
            marginTop: '1.5%',
            backgroundColor: '#f1f1f1',
            boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 1px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)'
        }}>
            {/* Title */}
            <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                <Typography sx={{
                    padding: '7px 4px 6px 7px',
                    fontSize: '16px',
                    color: '#385076',
                    fontWeight: '600'
                }}>Energy Meter</Typography>
                <Typography sx={{
                    fontSize: '16px',
                    color: '#385076',
                    fontWeight: '600'
                }}>
                    <InfoOutlinedIcon sx={{ fontSize: '17px', margin: '10px 11px 0px 0px' }} />
                </Typography>
            </Box>
            <Typography sx={{
                borderBottom: '2px solid #0000004a',
                margin: '1% 0% 2% 1%',
                width: '98%',
                color: '#0000001c'
            }}></Typography>
            {/* <-------Components --------------->*/}
            <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1 }} sx={{
                width: '98%',
                height: 'auto',
                marginLeft: '12px !important',
                color: '#385076',
            }}>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: '13vh' }}>
                    <Component title={'Total Power'} volume={data?.kWh || 0 } isVisi={false} para={'capacity'} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: '13vh' }}>
                    <Component title={'Phase_1 Power'} volume={data?.KW1 || 0} isVisi={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: '13vh' }}>
                    <Component title={'Phase_2 Power'} volume={data?.KW2 || 0} isVisi={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ height: 'auto' }}>
                    <Component title={'Phase_3 Power'} volume={data?.KW3 || 0} isVisi={true} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default EnergyMeter;
