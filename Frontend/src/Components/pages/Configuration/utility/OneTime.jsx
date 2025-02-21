import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify';
import getDeviceID from '../../api/getDeviceid';
import postOneTime from '../../api/postOneTime';

const OneTime = () => {
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [machineOptions, setMachineOptions] = useState([]);
  const [plantOptions, setPlantOptions] = useState([]);
  const [lineOptions, setLineOptions] = useState([]);
  const [mouldOptions, setMouldOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch options here
        setDeviceOptions(devices);
        setMachineOptions(machines);
        setPlantOptions(plants);
        setLineOptions(lines);
        setMouldOptions(moulds);
        setProductOptions(products);
      } catch (error) {
        console.error('Failed to fetch options:', error);
      }
    };
    fetchOptions();
  }, []);

  const [deviceIdOptions, setDeviceIdOptions] = useState([]);
  const [machineIdOptions, setMachineIdOptions] = useState([]);
  const [formData, setFormData] = useState({
    device_id: '',
    macId: '',
    idealCycleTime: '',
    idealPartWeight: '',
    plantId: '',
    lineId: '',
    mouldId: '',
    productId: '',
    customer: '' // Added customer field
  });

  useEffect(() => {
    const storeDeviceId = async () => {
      try {
        const data = await getDeviceID();
        console.log('Device ID fetched:', data.device_id);
        console.log('Machine ID fetched:', data.mac_id);

        setDeviceIdOptions(data.device_id.map((item, index) => ({
          id: item.device_id,
          name: `Device ${index + 1}`
        })));

        setMachineIdOptions(data.mac_id.map((item, index) => ({
          id: item.MID,
          name: `Machine ${index + 1}`
        })));
      } catch (error) {
        console.error('Failed to store device ID:', error);
      }
    };

    storeDeviceId();
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

    const formattedFormData = {
      ...formData,
      idealCycleTime: new Date(formData.idealCycleTime).toISOString(),
      idealPartWeight: parseInt(formData.idealPartWeight, 10),
    };

    try {
      await postOneTime(formattedFormData);
      toast.success('Form submitted successfully!');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message || 'Failed to submit form.'}`);
      } else {
        toast.error('Failed to submit form.');
      }
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h6" gutterBottom>
        One Time
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Device ID</InputLabel>
        <Select
          name="device_id"
          value={formData.device_id}
          onChange={handleInputChange}
        >
          {deviceIdOptions.map((device) => (
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
          {machineIdOptions.map((machine) => (
            <MenuItem key={machine.id} value={machine.id}>
              {machine.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Ideal Cycle Time"
        name="idealCycleTime"
        type="datetime-local"
        value={formData.idealCycleTime}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Ideal Part Weight"
        name="idealPartWeight"
        type="number"
        value={formData.idealPartWeight}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Plant ID"
        name="plantId"
        value={formData.plantId}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Line ID"
        name="lineId"
        value={formData.lineId}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mould ID"
        name="mouldId"
        value={formData.mouldId}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Product ID"
        name="productId"
        value={formData.productId}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Customer"
        name="customer"
        value={formData.customer}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <hr />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default OneTime;
