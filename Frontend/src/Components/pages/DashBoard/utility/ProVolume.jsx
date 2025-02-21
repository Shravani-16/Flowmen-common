import { Grid, Typography, Box, styled } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';

const Lchar = styled(Box)`
  height: auto;
  width: 97.5%;
  background-color: #f1f1f1; 
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 1px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12);
  display:inline-block;
`;

const ProVolume = ({ isOpen, title, subTitles, para, pcs, isVisi, data }) => {
    if (!Array.isArray(subTitles)) {
        subTitles = Object.values(subTitles);
    }

    // console.log(data?.uData[0]?.rejectedProduction)
    // console.log(data?.calData)
    // console.log(data?.plcData[0]?.Prodcount)
    // console.log(data)

    const [progress, setProgress] = useState(Math.floor(Math.random() * (70 - 10 + 1)) + 30);

    const percentageData = {
        goodProduction: `${Math.min(Math.ceil((data?.uData[0]?.goodProduction * 100) / data?.plcData[0]?.Prodcount), 100) || 0}`,
        scrapProduction: `${Math.min(Math.ceil((data?.uData[0]?.rejectedProduction * 100) / data?.plcData[0]?.Prodcount), 100) || 0}`
    };
    
    return (
        <Lchar>
            {/*<---------TOP-------> */}
            <Grid container justifyContent='center' columnSpacing={2} sx={{ marginTop: '2%' }}>
                {/*<---------title---------->*/}
                <Grid item xs={5.5}>
                    <Typography sx={{
                        fontSize: '15px',
                        color: '#385076',
                        fontWeight: '600',
                    }}>{title}</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ fontSize: '37px' }}>{data?.plcData[0]?.Prodcount}</Typography>
                        {isVisi &&
                            <Typography sx={{ margin: '11.5% 0% 0% 9%', color: '#089981', fontSize: '14px' }}>&#8593;{pcs}</Typography>
                        }
                    </Box>
                </Grid>
                {/*<--------subTitle-------> */}
                <Grid item xs={5.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '101px' }}>
                        {subTitles.map((subTitle, index) => (
                            <Typography key={index} sx={{ fontSize: '9px', fontWeight: '700', padding: '5% 0% 6% 0%' }}>
                                {subTitle.name}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ width: '57px ', justifyContent: 'center', }}>
                        <Box sx={{
                            backgroundColor: 'hsl(217.18deg 100% 13.92%)', color: 'white', justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: '700',
                            margin: '8% 6% 2% 2%',
                            borderRadius: '5px',
                            padding: '0px 0px 1px 15px',
                            width: '80%'
                        }}>{percentageData.goodProduction}%</Box>

                        <Box sx={{
                            backgroundColor: 'hsl(50.1deg 93.41% 48.78% / 68%)',
                            color: 'white', justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: '700',
                            margin: '17% 6% 2% 2%',
                            borderRadius: '5px',
                            padding: '0px 0px 1px 15px',
                            width: '80%'
                        }}>{percentageData.scrapProduction}%</Box>

                        <Box sx={{
                            backgroundColor: 'hsl(220.65deg 13.19% 53.92%)', color: 'white', justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: '700',
                            margin: '17% 6% 2% 2%',
                            borderRadius: '5px',
                            padding: '0px 0px 1px 15px',
                            width: '80%'
                        }}> 60%</Box>
                    </Box>
                </Grid>
            </Grid>
            {/*<-----------SLIDERS------------> */}
            <Grid container columnSpacing={2} sx={{ width: '95%', justifyContent: 'center', padding: '0% 0% 2% 4%', color: 'hsl(220.65deg 13.19% 53.92%)', marginTop: '-5px' }}>
                <Grid item xs={10}>
                    <Slider sx={{
                        padding: '0% 0% 0% 0%', backgroundColor: '#fffff',
                        color: 'hsl(217.18deg 100% 13.92%)'
                    }}
                        size="small"
                        value={percentageData.goodProduction}
                        valueLabelDisplay="auto"
                        disableSwap />

                    <Slider sx={{
                        padding: '0% 0% 0% 0%',
                        backgroundColor: '#fffff', color: 'hsl(50.1deg 93.41% 48.78% / 68%)'
                    }}
                        size="small"
                        value={percentageData.scrapProduction}
                        valueLabelDisplay="auto"
                        disableSwap />

                    <Slider
                        sx={{
                            padding: '0% 0% 0% 0%',
                            backgroundColor: '#fffff',
                            color: 'hsl(220.65deg 13.19% 53.92%)'
                        }}
                        size="small"
                        value={60}
                        valueLabelDisplay="auto"
                        disableSwap
                    />
                </Grid>
                {/*<--------percentage----------> */}
                <Grid item xs={2}>
                    <Typography sx={{ color: 'hsl(214.86deg 100% 14.51%)', fontSize: '33px', marginTop: '14px', marginLeft: '5px' }}>60%</Typography>
                </Grid>
            </Grid>
        </Lchar>
    )
}

export default ProVolume;
