import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify';
import getDeviceID from '../../api/getDeviceid'; // Import your API fetching functions
import postShiftWise from '../../api/postShiftWise'; // Import your API posting function

const ShiftWise = () => {
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [machineOptions, setMachineOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getDeviceID();
        console.log('Device ID fetched:', data.device_id);
        console.log('Machine ID fetched:', data.mac_id);

        // Assuming data.device_id and data.mac_id are arrays of objects with ID and name
        setDeviceOptions(data.device_id.map((item, index) => ({
          id: item.device_id,
          name: `Device ${index + 1}` // Assign user-friendly names like "Device 1", "Device 2", etc.
        })));

        setMachineOptions(data.mac_id.map((item, index) => ({
          id: item.MID,
          name: `Machine ${index + 1}` // Assign user-friendly names like "Machine 1", "Machine 2", etc.
        })));
      } catch (error) {
        console.error('Failed to fetch options:', error);
      }
    };
    fetchOptions();
  }, []);

  const [formData, setFormData] = useState({
    macId: '',
    batchNo: '',
    mouldId: '',
    device_id: '',
    productName: '',
    shiftStartTime: '',
    shiftEndTime: '',
    plannedDowntime: '',
    productionTarget: '',
    operatorChange: '',
    noCavity: '' // Add the new field here
  });

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

    // Convert form data to correct formats
    const formattedFormData = {
      ...formData,
      plannedDowntime: parseInt(formData.plannedDowntime, 10), // Convert to integer
      productionTarget: parseInt(formData.productionTarget, 10), // Convert to integer
      shiftStartTime: new Date(formData.shiftStartTime).toISOString(), // Convert to ISO string
      shiftEndTime: new Date(formData.shiftEndTime).toISOString(), // Convert to ISO string
      noCavity: parseInt(formData.noCavity, 10) // Convert to integer
    };

    try {
      await postShiftWise(formattedFormData);
      toast.success('ShiftWise data submitted successfully!');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message || 'Failed to submit data.'}`);
      } else {
        toast.error('Failed to submit data.');
      }
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h6" gutterBottom>
        Shift Wise  
      </Typography>
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
        label="Mould ID"
        name="mouldId"
        value={formData.mouldId}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="No. of Cavities"
        name="noCavity"
        type="number"
        value={formData.noCavity}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Shift Start Time"
        name="shiftStartTime"
        type="datetime-local"
        value={formData.shiftStartTime}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Shift End Time"
        name="shiftEndTime"
        type="datetime-local"
        value={formData.shiftEndTime}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Production Target"
        name="productionTarget"
        type="number"
        value={formData.productionTarget}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Batch No."
        name="batchNo"
        value={formData.batchNo}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Planned Downtime"
        name="plannedDowntime"
        type="number"
        value={formData.plannedDowntime}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Operator Change"
        name="operatorChange"
        value={formData.operatorChange}
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

export default ShiftWise;
