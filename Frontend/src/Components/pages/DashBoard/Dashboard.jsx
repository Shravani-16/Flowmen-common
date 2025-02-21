import React, { useState, useEffect, useMemo } from "react";
import { Box, Grid, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material";
import Linechart from "../containts/Charts/LineChart";
import Navbar from "../../Navbar/Navbar";
import styled from "styled-components";
import {
  ProVolume,
  TPReport,
  CycTime,
  DownTime,
  PreChart,
  MacInPro,
  EnergyMeter,
} from "../containts";
import lineData from "../api/lineData";
import { useSelector } from "react-redux";
import { getDeviceData, getDeviceID } from "../api";
import { fetchData } from "../../api/fetchData";

const Component = styled(Box)`
  justify-content: center;
  height: auto;
  margin-bottom: 2% !important;
`;

const BComponent = styled(Box)`
  justify-content: center;
  height: auto;
  margin-bottom: 2% !important;
`;

const Progress = styled(Box)`
  height: 81.5vh;
  margin-top: 2%;
`;

const Header = styled(Box)`
  background-color: hsl(0deg 0% 95.29%);
  position: fixed;
  width: ${(props) => (props.isOpen ? "88%" : "100%")};
  z-index: 1;
  padding: 0% 2% 0% 1%;
  height: 70px;
  align-items: center;
  display: flex;
  justify-content: space-between; // Align items horizontally
`;

const GridContainer = styled.div`
  padding-top: 1px;
  display: inline-block;
  height: 100vh;
  justify-content: center;
  width: ${(props) => (props?.isOpen ? "98%" : "98%")};
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Dashboard = ({ isOpen, toggle }) => {
  const userData = useSelector((state) => state.auth?.userData);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
    }
  }, [userData]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [obj, setObj] = useState("");
  const [dashboardData, setDashboardData] = useState("");
  const [EData, setEData] = useState("");
  const [finaldata, setfinalData] = useState(null);
  const [noCavity, setNoCavity] = useState(1);

  const [deviceOptions, setDeviceOptions] = useState([]);
  const [machineOptions, setMachineOptions] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedMachineId, setSelectedMachineId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const props = useMemo(()=>[
    {
      id: 1,
      name: "1min",
      dataKey: "availability",
      title: "Availability",
      per: finaldata?.calData?.[0]?.availability || 0,
    },
    {
      id: 2,
      name: "2min",
      dataKey: "performance",
      title: "Performance",
      per: finaldata?.calData?.[0]?.performance || 0,
    },
    {
      id: 3,
      name: ["1min", "2min", "3min", "4min", "5min"],
      dataKey: "quality",
      title: "Quality",
      per: finaldata?.calData?.[0]?.quality || 0,
    },
    { id: 4, name: "4min", dataKey: "oEE", title: "OEE", per: finaldata?.calData?.[0]?.oee || 0 },
  ],[finaldata]);

  const DashURL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getDashboard/data/dashboard/?device_id=${selectedDeviceId}&mac_id=${selectedMachineId}`;

  useEffect(() => {
    if (!selectedDeviceId || !selectedMachineId) return;
  
    const runData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(DashURL, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b",
            "org-id": "b7d31442-4487-4138-b69d-1fd97e7a5ae6",
          },
        });
  
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  
        const responseData = await response.json();
        if (responseData.data) setfinalData(responseData.data);
  
        // Fetch noCavity Data
        const { noCavity } = await fetchData(
          "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getShiftaata/data/Shift/"
        );
        setNoCavity(noCavity);
  
        // Fetch other data
        const [data, eData] = await Promise.all([lineData(), getDeviceData()]);
        setDashboardData(data);
        setEData(eData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const interval = setInterval(runData, 5000);
    return () => clearInterval(interval);
  }, [selectedDeviceId, selectedMachineId]);
  

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getDeviceID();
        console.log("Fetched Data:", data);

        if (Array.isArray(data.device_id) && Array.isArray(data.mac_id)) {
          const devices = data.device_id.map((item, index) => ({
            id: item.device_id,
            name: `Device ${index + 1}`,
          }));
          console.log("Device Options:", devices);

          const machines = data.mac_id.map((item, index) => ({
            id: item.MID,
            name: `Machine ${index + 1}`,
          }));
          console.log("Machine Options:", machines);

          setDeviceOptions(devices);
          setMachineOptions(machines);
        } else {
          console.error("Expected device_id and mac_id to be arrays");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  const handleMachineChange = (event) => {
    setSelectedMachineId(event.target.value);
  };

  return (
    <GridContainer isOpen={isOpen}>
      <Header isOpen={isOpen}>
        <Navbar />
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginRight: "20px" }}>
          <FormControl fullWidth size="small" sx={{ minWidth: "150px" }}>
            <InputLabel>Select Device</InputLabel>
            <Select
              value={selectedDeviceId}
              onChange={handleDeviceChange}
              label="Select Device"
            >
              {deviceOptions.length > 0 ? (
                deviceOptions.map((device) => (
                  <MenuItem key={device.id} value={device.id}>
                    {device.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No devices available</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ minWidth: "150px" }}>
            <InputLabel>Select Machine</InputLabel>
            <Select
              value={selectedMachineId}
              onChange={handleMachineChange}
              label="Select Machine"
            >
              {machineOptions.length > 0 ? (
                machineOptions.map((machine) => (
                  <MenuItem key={machine.id} value={machine.id}>
                    {machine.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No machines available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Header>

      <Component>
        {loading && <Typography>Loading dashboard data...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <PreChart
          show={show}
          handleClose={handleClose}
          obj={obj}
          data={dashboardData}
          finaldata={finaldata}
        />

        <Grid
          container
          columnSpacing={1}
          style={{
            width: "100%",
            marginBottom: "1%",
            marginLeft: "1%",
            marginTop: isOpen ? "5%" : "4%",
          }}
        >
          <Grid item xs={12} md={12} lg={8} sx={{ marginTop: "0.5%" }}>
            <div style={{ display: "block", width: "99%" }}>
              <Grid container spacing={1.5} sx={{ padding: "2% 0% 0% 1%" }}>
                {props.map((item) => (
                  <Grid key={item.id} item xs={12} sm={12} md={6} lg={6}>
                    <Linechart
                      data={dashboardData}
                      dataKey={item.dataKey}
                      name={item.name}
                      title={item.title}
                      per={item.per}
                      setObj={setObj}
                      setShow={setShow}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
            <Box sx={{ width: "99%", padding: "0% 0% 0% 1%" }}>
              <TPReport data={finaldata} noCavity={noCavity} />
              <CycTime data={finaldata} />
            </Box>
          </Grid>
          <Grid item md={10} lg={4}>
            <Progress>
              <Grid
                item
                xs={12}
                sx={{ marginTop: "5.5%", padding: "0px 5px 0px 0px" }}
              >
                <ProVolume
                  isOpen={isOpen}
                  title="Production Volume"
                  subTitles={[
                    { name: "Good Production" },
                    { name: "Scrap Production" },
                    { name: "NCR" },
                  ]}
                  para={573}
                  pcs="17Pcs"
                  isvisi={true}
                  data={finaldata}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginTop: "3%", padding: "0px 5px 0px 0px" }}
              >
                <MacInPro
                  isOpen={isOpen}
                  title="Machines In Production"
                  subTitles={[
                    { name: "Production" },
                    { name: "Setup" },
                    { name: "No Activity" },
                  ]}
                  para="47/64"
                  data={finaldata }
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginTop: "3%", padding: "0px 6px 0px 0px" }}
              >
                <DownTime data={finaldata} />
              </Grid>
            </Progress>
          </Grid>
        </Grid>
      </Component>
      <BComponent
        sx={{
          marginBottom: "2%",
          marginTop: "-1.2%",
          padding: "0px 0px 7px 30px",
          width: "100%",
        }}
      >
        <EnergyMeter data={finaldata?.meterData?.[0]} />
      </BComponent>
    </GridContainer>
  );
};

export default Dashboard;