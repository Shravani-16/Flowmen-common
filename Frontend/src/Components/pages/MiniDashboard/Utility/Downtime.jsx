import { useState, useEffect } from "react";
import { Box, Typography, Slider } from "@mui/material";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Component = styled(Box)`
  height: auto;
  width: 100%;
  // background-color: #f1f1f1;
  // box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 1px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12);
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
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
  const hourstr = hours > 0 ? hours + "h" : "";
  const minstr = minutes > 0 ? minutes + "m" : "";
  const result = hourstr + " " + minstr;
  return result;
};

const DownTime = ({ data }) => {
  // console.log(data?.MdownT)
  const [time, setTime] = useState({ hoursStr: 0, minutesStr: 0 });

  useEffect(() => {
    // const totalSeconds =
    //   data.operatorBreak +
    //   data.operatorUnavailable +
    //   data.materialUnavailable +
    //   data.waitingOnInception +
    //   data.machineIssues;
    const { hoursStr, minutesStr } = convertMsToHrMin(data?.MdownT);
    setTime({ hoursStr, minutesStr });
  }, [data]);

  return (
    <Component>
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '92%', margin: '2% 0% 0% 4%' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#385076' }}>DownTime</Typography>
        <Typography><InfoOutlinedIcon sx={{ fontSize: '17px' }} /></Typography>
      </Box> */}

      <Box
        sx={{
          display: "flex",
          width: "85%",
          margin: "0% 0% 0% 10%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            color: "hsl(214.86deg 100% 14.51%)",
            fontSize: "25px",
            display: "flex",
          }}
        >
          <Typography sx={{ fontSize: "40px", fontWeight: "500" }}>
            {time.hoursStr || 0}
          </Typography>
          <Typography sx={{ fontSize: "23px", marginTop: "16px" }}>
            h
          </Typography>
          &nbsp;
          <Typography sx={{ fontSize: "40px", fontWeight: "500" }}>
            {time.minutesStr || 0}
          </Typography>
          <Typography sx={{ fontSize: "23px", marginTop: "16px" }}>
            m
          </Typography>
        </Box>
        <Box
          sx={{
            alignContent: "flex-end",
            margin: "0px 0px 13px 10px",
            padding: "0px 11px 0px 0px",
          }}
        >
          {/* <Typography
            sx={{ fontSize: "15px", color: "#089981", fontWeight: "700" }}
          >
            ↑3h 23m
          </Typography> */}
        </Box>
      </Box>
    </Component>
  );
};

export default DownTime;
