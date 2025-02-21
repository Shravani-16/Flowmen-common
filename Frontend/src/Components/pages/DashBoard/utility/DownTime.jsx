import { useState, useEffect } from "react";
import { Box, Typography, Slider } from "@mui/material";
import styled from "styled-components";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Component = styled(Box)`
  height: auto;
  width: 98%;
  background-color: #f1f1f1;
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 1px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12);
  display: inline-block;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Sliders = styled(Box)`

  padding: 0px 23px 0px 20px;
  overflow-y: auto;/* Enable vertical scrolling */
    height: calc(50vh - 158px);/* Adjust this value based on the height of other elements */
  padding-bottom: 1.4%;

  /* Custom scrollbar styles for Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background of the scrollbar track */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Roundness of the scrollbar thumb */
    border: 3px solid #f1f1f1; /* Space around the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color when hovering over the scrollbar thumb */
  }

  /* Optional: Additional styles for Internet Explorer and Edge */
  @supports (-ms-overflow-style: none) {
    -ms-overflow-style: -ms-autohiding-scrollbar; /* Hides the scrollbar when not scrolling */
  }
`;

const convertMsToHrMin = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hoursStr: hours, minutesStr: minutes };
};

const convertToHrMin = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const hourstr = hours > 0 ? hours + "h" : "0h";
  const minstr = minutes > 0 ? minutes + "m" : "0m";
  const result = hourstr + " " + minstr;
  return result;
};

const DownTime = ({ data }) => {
  // console.log(data?.plcData?.[0].MdownT)
  const [time, setTime] = useState({ hoursStr: 0, minutesStr: 0 });


  useEffect(() => {
    const totalSeconds = data?.operatorBreak + data?.operatorUnavailable + data?.materialUnavailable + data?.waitingOnInspection + data?.machineIssues;
    const { hoursStr, minutesStr } = convertMsToHrMin(data?.plcData?.[0].MdownT);
    setTime({ hoursStr, minutesStr });
  }, [data]);

  return (
    <Component>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '92%', margin: '2% 0% 0% 4%' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#385076' }}>DownTime</Typography>
        <Typography><InfoOutlinedIcon sx={{ fontSize: '17px' }} /></Typography>
      </Box>

      <Box sx={{ display: 'flex', width: '93%', margin: '0% 0% 0% 3%' }}>
        <Box sx={{ color: 'hsl(214.86deg 100% 14.51%)', fontSize: '25px', display: 'flex' }}>
          <Typography sx={{ fontSize: '40px', fontWeight: '500' }}>{time.hoursStr || 0}</Typography>
          <Typography sx={{ fontSize: '23px', marginTop: '16px' }}>h</Typography>&nbsp;
          <Typography sx={{ fontSize: '40px', fontWeight: '500' }}>{time.minutesStr || 0}</Typography>
          <Typography sx={{ fontSize: '23px', marginTop: '16px' }}>m</Typography>
        </Box>
        <Box sx={{ alignContent: 'flex-end', margin: '20px 28px 11px 28px', padding: '0px 0px 3px 6px' }}>
          <Typography sx={{ fontSize: '15px', color: '#089981', fontWeight: '700' }}>↑3h 23m</Typography>
        </Box>
      </Box>

      <Sliders sx={{ width: '95%' }}>
        {[
          { label: 'Operator Break', value: data?.operatorBreak },
          { label: 'Operator Unavailable', value: data?.operatorUnavailable },
          { label: 'Material Unavailable', value: data?.materialUnavailable },
          { label: 'Waiting On Inspection', value: data?.waitingOnInspection },
          { label: 'Machine Issues', value: data?.machineIssues }
        ].map((item, index) => (
          <Box key={index} sx={{ marginTop: index === 0 ? '0' : '-1%' }}>
            <Box sx={{ justifyContent: 'space-between', display: 'flex', color: '#385076' }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>{item.label}</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>{convertToHrMin(item.value)}</Typography>
            </Box>
            <Box sx={{ marginTop: '-1%' }}>
              <Slider
                sx={{ backgroundColor: '#fffff', color: 'hsl(217.18deg 100% 13.92%)' }}
                size="small"
                getAriaLabel={() => 'Minimum distance'}
                value={item.value / 1000}
                valueLabelDisplay="auto"
                disableSwap
              />
            </Box>
          </Box>
        ))}
      </Sliders>
    </Component>
  );
};

export default DownTime;
