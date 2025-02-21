
import React, { useState } from "react";
import Sidebar from "../../../Navbar/SideBar";
import Home from "../../../home/Home";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Container, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import Machine from "./Machine";
import styled from "styled-components";

const StyledColumn = styled.div`
  //   background-color: #f1f1f1;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

function MachineReport() {
  const [isOpen, setIsOpen] = useState(true); // Initial state for sidebar
  const toggle = () => setIsOpen(!isOpen); // Function to toggle sidebar state

  return (
    <div
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateColumns: isOpen ? "222px 1fr" : "49px 1fr",
      }}
    >
      <Grid item lg={isOpen ? 4 : 1} style={{ width: "100%" }}>
        <Sidebar isOpen={isOpen} toggle={toggle} />
      </Grid>
      <div style={{ justifyContent: "center", overflow: "inherit" }}>
        <Home isOpen={isOpen} toggle={toggle} />
        <div
          className="header"
          style={{
            backgroundColor: "hsl(0deg 0% 95.29%)",
            display: "flex",
            position: "fixed",
            marginTop: "4%",
            width: isOpen ? "89%" : "100%",
          }}
        >
          <Grid
            columnSpacing={2}
            sx={{ display: "flex", float: "left", width: "97%" }}
          >
            <Grid item lg={7} sx={{ display: "inline-block", float: "left" }}>
              <Typography
                style={{
                  color: "#385076",
                  fontWeight: 800,
                  marginTop: "4px",
                  alignItems: "center",
                }}
              >
                Mini Dashboard : Machine Report
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "15px",
            padding: "12% 2% 0%",
          }}
        >
          <Box
            sx={{
              // padding: "5px",
              width: "100%", // Added width to ensure responsiveness
              maxWidth: "800px", // Added maxWidth to limit width on larger screens
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%", // Ensure the icon stays on the right
              }}
            >
              <Typography
                sx={{
                  margin: "-8px",
                  padding: "0 4% 2% 5%",
                  fontSize: "18px",
                  color: "#385076",
                  fontWeight: "600",
                  flexGrow: 1, // Allow title to take remaining space
                  cursor: "pointer",
                }}
              >
                Running Machine
              </Typography>
              {/* <InfoOutlinedIcon
            sx={{ fontSize: "17px", margin: "10px 11px 0px 0px" }}
          /> */}
            </Box>
          </Box>
          <StyledColumn style={{ marginBottom: "45px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>M/C Name</th>
                  <th>Mould Product</th>
                  <th>Prod Qty</th>
                  <th>Operator in Current Shift</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mc 1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Mc 2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Mc 3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </StyledColumn>
          <Box
            sx={{
              // padding: "5px",
              width: "100%", // Added width to ensure responsiveness
              maxWidth: "800px", // Added maxWidth to limit width on larger screens
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%", // Ensure the icon stays on the right
              }}
            >
              <Typography
                sx={{
                  margin: "-8px",
                  padding: "0 4% 2% 5%",
                  fontSize: "18px",
                  color: "#385076",
                  fontWeight: "600",
                  flexGrow: 1, // Allow title to take remaining space
                  cursor: "pointer",
                }}
              >
                Down Machine
              </Typography>
              {/* <InfoOutlinedIcon
            sx={{ fontSize: "17px", margin: "10px 11px 0px 0px" }}
          /> */}
            </Box>
          </Box>
          <StyledColumn style={{ marginBottom: "45px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>M/C Name</th>
                  <th>Mould Product</th>
                  <th>Down Reason</th>
                  <th>Down Time</th>
                  <th>Operator in Current Shift</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mc 1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Mc 2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Mc 3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </StyledColumn>
        </div>
      </div>
    </div>
  );
}

export default MachineReport;
