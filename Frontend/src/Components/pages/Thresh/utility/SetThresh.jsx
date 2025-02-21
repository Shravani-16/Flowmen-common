import React from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from "@mui/material";

const SetThresh = ({ parameters, limits, handleLimitChange, handleSwitchChange }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Parameter</TableCell>
            <TableCell>Low Limit</TableCell>
            <TableCell>Mid Limit</TableCell>
            <TableCell>High Limit</TableCell>
            <TableCell>Current Value</TableCell>
            <TableCell>Set/Enable alert</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parameters.map((param) => (
            <TableRow key={param.id}>
              <TableCell>{param.name}</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={limits[param.id].low}
                  onChange={(e) =>
                    handleLimitChange(param.id, "low", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={limits[param.id].mid}
                  onChange={(e) =>
                    handleLimitChange(param.id, "mid", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={limits[param.id].high}
                  onChange={(e) =>
                    handleLimitChange(param.id, "high", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={limits[param.id].current}
                  onChange={(e) =>
                    handleLimitChange(param.id, "current", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={limits[param.id].notify}
                  onChange={() => handleSwitchChange(param.id)}
                />
              </TableCell>   
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SetThresh; 



/*
Make the switch enable disable : its only enable {bug: we can disable switch}
When no value set then also it gives the notification of the set and the thresh hit
change the UI of the user input 
functionality of the execute and pending { when user set the thresh that thresh will seen in the pending if it hit then it will shown in the executed }
Basically we need to add the to do linst feature here in the set pending and executed 
Reaserch on the threshhold and make UI Responsive 
*/