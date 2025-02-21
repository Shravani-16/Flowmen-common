import { Box, Button, Grid, Typography } from "@mui/material";
import Home from "../../home/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import Datepicker from "../../DateTimePicker/DatePicker";
import Sidebar from "../../Navbar/SideBar";
import { Container } from "react-bootstrap";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useReactToPrint } from "react-to-print";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  // gap: 10px;
  margin: -40px 0px 0px 0;
  background-color: #f3f3f3;
  height: 50px;

  button {
    color: #0f2765;
    font-weight: 600;
    border-radius: 0px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 5px 15px;
    position: relative;

    &:hover {
      background-color: hsl(48.62deg, 82.95%, 61.37%);
      color: #0f2765;
    }
    &.active {
      background-color: hsl(48.62deg, 82.95%, 61.37%);
    }
    &.active::after {
      // background-color: #0f2765;
    }
  }
`;

const Production = ({ isOpen, toggle }) => {
  const [reportData, setProdReportData] = useState([]);
  const componentPDF = useRef();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("production"); // State to manage active button

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: () => alert("Data downloaded successfully"),
  });

  // API for the report
  const URL =
    "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getProductionReport/get_productionReport/";

  useEffect(() => {
    const fetchProdReportData = async () => {
      try {
        const response = await fetch(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b",
            "org-id": "b7d31442-4487-4138-b69d-1fd97e7a5ae6",
          },
        });

        const responseData = (await response.json()).data;
        setProdReportData(responseData); // Assuming responseData contains the data in the required format
      } catch (error) {
        console.error(error);
      }
    };

    fetchProdReportData();
  }, []);

  // Function to convert timestamp to DD/MM/YY format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const plantHandler = () => {
    navigate("/report");
    setActiveButton("plant");
  };

  const productionHandler = () => {
    navigate("/Production");
    setActiveButton("production");
  };

  const downtimeHandler = () => {
    navigate("/DowntimeRepo");
    setActiveButton("downtime");
  };

  const qualityHandler = () => {
    navigate("/qualityReport");
    setActiveButton("quality");
  };

  return (
    <div
      className="grid-container"
      style={{ gridTemplateColumns: isOpen ? "222px 1fr" : "49px 1fr" }}
    >
      <Grid item lg={isOpen ? 4 : 1} style={{ width: "100%" }}>
        <Sidebar isOpen={isOpen} toggle={toggle} />
      </Grid>
      <div style={{ display: "inline-block" }}>
        {/*<-----------Header-----------> */}
        <div
          style={{
            height: "70px",
            justifyContent: "center",
            width: isOpen ? "90%" : "98%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Home isOpen={isOpen} toggle={toggle} />
        </div>
        {/*<---------Navbar--------->*/}
        <div
          className="header"
          style={{
            backgroundColor: "hsl(0deg 0% 95.29%)",
            display: "flex",
            position: "fixed",
            marginTop: "0%",
            width: isOpen ? "89%" : "100%",
            padding: "0% 2% 0% 1%",
          }}
        >
          <Grid
            columnSpacing={2}
            sx={{ display: "flex", float: "left", width: "97%" }}
          >
            <Grid item lg={7} sx={{ display: "inline-block", float: "left" }}>
              <Typography
                sx={{
                  color: "hsl(215.84deg 100% 15.1%)",
                  fontWeight: 800,
                  marginTop: "4px",
                  alignItems: "center",
                }}
              >
                Production Report
              </Typography>
            </Grid>

            <Grid
              item
              lg={5}
              sx={{ marginLeft: "auto", boxShadow: "none", float: "right" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{ color: "hsl(215.84deg 100% 15.1%)", marginRight: "2%" }}
                >
                  <Datepicker />
                </Box>
                <Button
                  sx={{ color: "hsl(215.84deg 100% 15.1%)", marginRight: "2%" }}
                  onClick={generatePDF}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip variant="light" id="button-tooltip-2">
                        Download the data
                      </Tooltip>
                    }
                  >
                    <FileDownloadIcon />
                  </OverlayTrigger>
                </Button>
                <Button
                  sx={{ color: "hsl(215.84deg 100% 15.1%)", fontWeight: 550 }}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip variant="light" id="button-tooltip-2">
                        Refresh
                      </Tooltip>
                    }
                  >
                    <RefreshIcon />
                  </OverlayTrigger>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Container
          style={{ marginTop: "11%", paddingLeft: isOpen ? "3%" : "0%" }}
        >
          <CenteredContainer>
            <ButtonContainer>
              <Button
                onClick={plantHandler}
                className={activeButton === "plant" ? "active" : ""}
                sx={{ color: "#0f2765", fontWeight: "600" }}
              >
                Plant Report
              </Button>
              <Button
                onClick={productionHandler}
                className={activeButton === "production" ? "active" : ""}
                sx={{ color: "#0f2765", fontWeight: "600" }}
              >
                Production Report
              </Button>
              <Button
                onClick={downtimeHandler}
                className={activeButton === "downtime" ? "active" : ""}
                sx={{ color: "#0f2765", fontWeight: "600" }}
              >
                Downtime Report
              </Button>
              <Button
                onClick={qualityHandler}
                className={activeButton === "quality" ? "active" : ""}
                sx={{ color: "#0f2765", fontWeight: "600" }}
              >
                Quality Report
              </Button>
            </ButtonContainer>
          </CenteredContainer>
          <div style={{ paddingTop: "2%", width: "100%" }}>
            <p style={{ fontSize: "16px", fontWeight: "700" }}>Daily Summary</p>
            <div
              ref={componentPDF}
              style={{ overflowX: "auto", width: "100%", margin: "0 auto" }}
            >
              <CTable
                bordered
                borderColor="gray"
                style={{ width: "100%", border: "1px solid gray" }}
              >
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell rowSpan="2" scope="col">
                      Date
                    </CTableHeaderCell>
                    <CTableHeaderCell colSpan="3" scope="col">
                      Production
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan="2" scope="col">
                      Energy per good production(kWh)
                    </CTableHeaderCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Good</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Reject</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {reportData.map((data, index) => (
                    <CTableRow
                      key={index}
                      color={
                        index % 3 === 0
                          ? "info"
                          : index % 3 === 1
                          ? "warning"
                          : "danger"
                      }
                    >
                      <CTableDataCell>
                        {formatDate(data.timestamp)}
                      </CTableDataCell>
                      <CTableDataCell>{data.good}</CTableDataCell>
                      <CTableDataCell>{data.reject}</CTableDataCell>
                      <CTableDataCell>{data.total}</CTableDataCell>
                      <CTableDataCell>{data.energy1}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Production;
