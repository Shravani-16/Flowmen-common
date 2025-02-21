import { Grid, styled } from '@mui/material';
import React from 'react';
import CustomCard from './Utility/Card';
import postDowntime from './Utility/postDowntime';

const Component = styled(Grid)`
    display: flex;
    margin: 8% 2% 1% 2%;
    padding: 0px 0px 31px 0px;
    border: 2px solid lightgray;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 9px;
    width: 97%;
`;

function Operator() {
  const handleDone = (time, title) => {
    // Call postDowntime with appropriate data
    const postData = {
      time,
      title,
    };
    postDowntime(postData);
  };

  return (
    <Component container justifyContent="space-between" rowSpacing={5}>
      {['Operator Break', 'Operator Unavailable', 'Material Unavailable', 'Waiting On Inspection', 'Machine Issues'].map((title) => (
        <Grid item lg={6} md={6} sm={8} xs={12} key={title} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomCard title={title} onDone={handleDone} />
        </Grid>
      ))}
    </Component>
  );
}

export default Operator;
