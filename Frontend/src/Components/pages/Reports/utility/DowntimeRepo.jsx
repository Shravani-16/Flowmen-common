import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react"; // Importing CoreUI components

const DowntimeRepo = ({ dates }) => {
  const componentPDF = useRef();
  const [reportData, setReportData] = useState([]);

  const fetchDownReportData = async () => {
    const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getdowntimeReport/get-downtimeReport/?start=${dates[0]}&stop=${dates[1]}`;

    try {
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b",
          "org-id": "b7d31442-4487-4138-b69d-1fd97e7a5ae6",
        },
      });

      const responseData = await response.json();
      console.log("API Response Data:", responseData);
      setReportData(responseData.data);
    } catch (error) {
      console.error("Error fetching downtime report:", error);
    }
  };

  useEffect(() => {
    fetchDownReportData();
  }, [dates]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const formatDuration = (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <p style={{ fontSize: "16px", fontWeight: "700" }}>Daily Downtime Report</p>
      <CTable
        bordered
        borderColor="gray"
        style={{ width: "100%", border: "1px solid gray", textAlign: "center" }}
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan="2" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              Name of Company & its logo
            </CTableHeaderCell>
            <CTableHeaderCell colSpan="5" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              DAILY DOWNTIME REPORT
            </CTableHeaderCell>
            <CTableHeaderCell colSpan="1" rowSpan="1">
              Doc. No:
            </CTableHeaderCell>
            <CTableHeaderCell colSpan="1" style={{width:"10rem"}}></CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell colSpan="1">Rev. No:</CTableHeaderCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell colSpan="1">Rev. Date:</CTableHeaderCell>
            <CTableDataCell colSpan="1"></CTableDataCell>
          </CTableRow>
          <CTableRow style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <CTableHeaderCell colSpan="3"></CTableHeaderCell>
            <CTableHeaderCell >Date: </CTableHeaderCell>
            <CTableHeaderCell colSpan="3"></CTableHeaderCell>
            <CTableHeaderCell>Operator:</CTableHeaderCell>
            <CTableHeaderCell colSpan="1"></CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell>Sr. No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Operator Break</CTableHeaderCell>
            <CTableHeaderCell scope="col">Operator Unavailable</CTableHeaderCell>
            <CTableHeaderCell scope="col">Runner Weight (kg)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Material Unavailable</CTableHeaderCell>
            <CTableHeaderCell scope="col">Waiting On Inspection</CTableHeaderCell>
            <CTableHeaderCell scope="col">Machine Issues</CTableHeaderCell>
            <CTableHeaderCell colSpan="1">Downtime (Start to End)</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reportData && reportData.length > 0 ? (
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
                <CTableDataCell>{formatDuration(data.operator_Break)}</CTableDataCell>
                <CTableDataCell>{formatDuration(data.operator_Unavailable)}</CTableDataCell>
                <CTableDataCell>{data.runner_Weight}</CTableDataCell>
                <CTableDataCell>{formatDuration(data.material_Unavailable)}</CTableDataCell>
                <CTableDataCell>{formatDuration(data.waiting_On_Inspection)}</CTableDataCell>
                <CTableDataCell>{formatDuration(data.machine_Issues)}</CTableDataCell>
                <CTableDataCell colSpan="1">{formatDuration(data.downtime)}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="10">
                No Dates Selected/No Data in Selected Dates
              </CTableDataCell>
            </CTableRow>
          )}
          <CTableRow>
              <CTableHeaderCell colSpan="2" >
                Total:
              </CTableHeaderCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              </CTableRow>
            <CTableRow>
            <CTableHeaderCell colSpan="3" rowSpan="1" style={{ textAlign: 'right' }}>
                Operator Sign:
              </CTableHeaderCell> 
              <CTableDataCell colSpan="2"></CTableDataCell>  
              <CTableHeaderCell colSpan="2" rowSpan="1" style={{ textAlign: 'right' }}>
                Machine Start Counter:
              </CTableHeaderCell> 
            </CTableRow>
            <CTableRow>
            <CTableHeaderCell colSpan="3" rowSpan="1" style={{ textAlign: 'right' }}>
            Production Suprevisor Sign:
              </CTableHeaderCell> 
              <CTableDataCell colSpan="2"></CTableDataCell> 
              <CTableHeaderCell colSpan="2" rowSpan="1" style={{ textAlign: 'right' }}>
                Machine End Counter:
              </CTableHeaderCell>  
            </CTableRow>
        </CTableBody>
      </CTable>
    </>
  );
};

export default DowntimeRepo;
