import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import getDeviceID from '../../api/getDeviceid'; // Import your API fetching functions
import postQC from '../../api/postQC'; // Import your API posting function

const Component = styled(Box)`
  margin-top: 7%;
  margin-left: 2%;
  justify-content: center;
  height: auto;
  margin-bottom: 2% !important;

  @media (max-width: 600px) {
    margin-top: 20%;
    margin-left: 5%;
  }
`;

const Header = styled(Box)`
  margin: 3%;
  border-bottom: 2px solid lightgray;
  text-align: left;

  @media (max-width: 650px) {
    margin: 5%;
    text-align: center;
  }
`;

const Container = styled(Box)`
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 650px) {
    max-width: 1200px;
  }

  @media (max-width: 650px) {
    padding: 10px;
  }
`;

const QualityController = () => {
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [machineOptions, setMachineOptions] = useState([]);
  const [formData, setFormData] = useState({
    device_id: '',
    macId: '',
    goodProduction: '',
    rejectedProduction: '',
    rejectedReason: '',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getDeviceID();
        setDeviceOptions(data.device_id.map((item, index) => ({
          id: item.device_id,
          name: `Device ${index + 1}`
        })));

        setMachineOptions(data.mac_id.map((item, index) => ({
          id: item.MID,
          name: `Machine ${index + 1}`
        })));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key]) {
        toast.error(`Please fill in the ${key.replace('_', ' ')}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedData = {
      ...formData,
      goodProduction: parseInt(formData.goodProduction, 10),
      rejectedProduction: parseInt(formData.rejectedProduction, 10)
    };

    try {
      await postQC(formattedData);
      toast.success('Form submitted successfully!');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message || 'Failed to submit form.'}`);
      } else {
        toast.error('Failed to submit form.');
      }
    }
  };

  return (
    <Component>
      <Header>
        <Typography
          sx={{
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 600,
            color: "hsl(215.84deg 100% 15.1%)",
          }}
        >
          Quality Controller
        </Typography>
      </Header>
      <Container>
        <FormControl fullWidth margin="normal">
          <InputLabel>Device ID</InputLabel>
          <Select
            name="device_id"
            value={formData.device_id}
            onChange={handleInputChange}
          >
            {deviceOptions.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Machine ID</InputLabel>
          <Select
            name="macId"
            value={formData.macId}
            onChange={handleInputChange}
          >
            {machineOptions.map((machine) => (
              <MenuItem key={machine.id} value={machine.id}>
                {machine.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Good Production Quantity"
          name="goodProduction"
          type="number"
          value={formData.goodProduction}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rejected Production Quantity"
          name="rejectedProduction"
          type="number"
          value={formData.rejectedProduction}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rejected Reason"
          name="rejectedReason"
          value={formData.rejectedReason}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <hr />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </Component>
  );
};

export default QualityController;
