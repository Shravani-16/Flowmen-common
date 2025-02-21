import React, { useEffect, useState } from "react";
import moment from 'moment';
import styled from "styled-components";
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import { useSelector } from "react-redux";

const StyledTable = styled(CTable)`
  tbody tr:nth-child(3n + 1) {
    background-color: hsl(48.62deg, 82.95%, 61.37%);
  }
  tbody tr:nth-child(3n + 2) {
    background-color: red;
  }
  tbody tr:nth-child(3n + 3) {
    background-color: blue;
  }
`;

const StyledTableCell = styled(CTableDataCell)`
  color: #000; /* Adjust text color */
`;

const convertMillisecondsToTime = (milliseconds) => {
  if (isNaN(milliseconds) || milliseconds < 0) return "00:00:00";

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const PlantReport = ({ dates }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [reportData, setReportData] = useState([]);
  
  const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getplantReport/get_plantReport/?start=${dates?.[0]}&stop=${dates?.[1]}`;

  useEffect(() => {
    const fetchReportData = async () => {
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
        setReportData(responseData); // Assuming responseData contains the data in the required format
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportData();
  }, [dates]);

  // Function to convert timestamp to DD/MM/YY format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <p style={{ fontSize: "16px", fontWeight: "700" }}>Daily Summary</p>
      <CTable bordered borderColor="gray" style={{ textAlign: "center" }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan="3" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              {userData.companyName}
            </CTableHeaderCell>
            <CTableHeaderCell colSpan="6" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              DAILY PLANT REPORT
            </CTableHeaderCell>
            <CTableHeaderCell colSpan="1" rowSpan="1">
              Doc. No:
            </CTableHeaderCell>
            <CTableDataCell colSpan="2"></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell colSpan="1">Rev. No:</CTableHeaderCell>
            <CTableDataCell colSpan="2"></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell colSpan="1">Rev. Date:</CTableHeaderCell>
            <CTableDataCell colSpan="2"></CTableDataCell>
          </CTableRow>
          <CTableRow style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <CTableHeaderCell colSpan="2"></CTableHeaderCell>
            <CTableHeaderCell colSpan="1">Date: </CTableHeaderCell>
            <CTableHeaderCell colSpan="3">
              {dates[0] ? moment(dates[0]).format('DD-MM-YYYY') : ''} to {dates[1] ? moment(dates[1]).format('DD-MM-YYYY') : ''}
            </CTableHeaderCell>
            <CTableHeaderCell>Shift:</CTableHeaderCell>
            <CTableHeaderCell colSpan="2"></CTableHeaderCell>
            <CTableHeaderCell>Operator:</CTableHeaderCell>
            <CTableHeaderCell colSpan="2"></CTableHeaderCell>
          </CTableRow>
          <CTableRow style={{ textAlign: "center", verticalAlign: "middle" }}>
            <CTableHeaderCell scope="col">Sr.No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Good</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reject</CTableHeaderCell>
            <CTableHeaderCell scope="col">Runner Weight(kg)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Energy(kWh)</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Energy per good production(kWh)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">AVAILABILITY(%)</CTableHeaderCell>
            <CTableHeaderCell scope="col">PERFORMANCE(%)</CTableHeaderCell>
            <CTableHeaderCell scope="col">QUALITY(%)</CTableHeaderCell>
            <CTableHeaderCell scope="col">OEE(%)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Downtime Time <br /> (Start To End)</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reportData ? (
            reportData.map((data, index) => (
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
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{formatDate(data.timestamp)}</CTableDataCell>
                <CTableDataCell>{data.good}</CTableDataCell>
                <CTableDataCell>{data.rejected}</CTableDataCell>
                <CTableDataCell>{data.weight}</CTableDataCell>
                <CTableDataCell>{data.energy1}</CTableDataCell>
                <CTableDataCell>{data.energy2}</CTableDataCell>
                <CTableDataCell>{data.availability}</CTableDataCell>
                <CTableDataCell>{data.performance}</CTableDataCell>
                <CTableDataCell>{data.quality}</CTableDataCell>
                <CTableDataCell>{data.oee}</CTableDataCell>
                <CTableDataCell>{convertMillisecondsToTime(data.downtime)}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="12">
                No Dates Selected/No Data in Selected Dates
              </CTableDataCell>
            </CTableRow>
          )}
          <CTableRow>
            <CTableHeaderCell colSpan="2" style={{ textAlign: "right" }}>
              Total:
            </CTableHeaderCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell colSpan="2" rowSpan="1" style={{ textAlign: "right", verticalAlign: "middle" }}>
              Operator Sign:
            </CTableHeaderCell>
            <CTableDataCell colSpan="3"></CTableDataCell>
            <CTableHeaderCell colSpan="2" rowSpan="1" style={{ textAlign: "right", verticalAlign: "middle" }}>
              Machine Start Counter:
            </CTableHeaderCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
            <CTableHeaderCell colSpan="2" rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>
              Operation Incharge Sign:
            </CTableHeaderCell>
            <CTableDataCell colSpan="2" rowSpan="2"></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell colSpan="2" rowSpan="1" style={{ textAlign: "right", verticalAlign: "middle" }}>
              Production Supervisor Sign:
            </CTableHeaderCell>
            <CTableDataCell colSpan="3"></CTableDataCell>
            <CTableHeaderCell colSpan="2" rowSpan="1" style={{ textAlign: "right", verticalAlign: "middle" }}>
              Machine Start Counter:
            </CTableHeaderCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  );
};

export default PlantReport;
