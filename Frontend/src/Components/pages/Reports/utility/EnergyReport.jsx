import React, { useState, useEffect } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useSelector } from "react-redux";

function EnergyReport({ dates }) {
  const userData = useSelector((state) => state.auth.userData);
  const [reportData, setEnergyReportData] = useState([]);

  // API for the report
  const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/EnergyReport/data/energyReport/?start=${dates?.[0]}&stop=${dates?.[1]}`;

  useEffect(() => {
    const fetchEnergyReportData = async () => {
      try {
        const response = await fetch(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b",
            "org-id": "b7d31442-4487-4138-b69d-1fd97e7a5ae6",
          },
        });

        const responseData = (await response.json()).data;
        setEnergyReportData(responseData); // Assuming responseData contains the data in the required format
        // console.log(responseData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnergyReportData();
  }, [dates]);

  return (
    <>
      <p style={{ fontSize: "16px", fontWeight: "700" }}>Daily Summary</p>

      <CTable
        bordered
        borderColor="gray"
        style={{ width: "100%", border: "1px solid gray", textAlign: "center" }}
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan="2" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            {userData.companyName}
            </CTableHeaderCell>
            <CTableHeaderCell colSpan="2" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              DAILY ENERGY REPORT
            </CTableHeaderCell>
            <CTableHeaderCell rowSpan="1" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
              Doc. No:
            </CTableHeaderCell>
           
          </CTableRow>
          <CTableRow style={{ textAlign: 'left', verticalAlign: 'middle'}}>
            <CTableHeaderCell colSpan="1">Rev. No:</CTableHeaderCell>
       
          </CTableRow>
          <CTableRow style={{ textAlign: 'left', verticalAlign: 'middle' }}>
            <CTableHeaderCell colSpan="1">Rev. Date:</CTableHeaderCell>
          </CTableRow>
          <CTableRow style={{ textAlign: 'left', verticalAlign: 'middle' }}>
            <CTableHeaderCell colSpan="4"></CTableHeaderCell>
            <CTableHeaderCell>Operator:</CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell>Sr.No.</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
            <CTableHeaderCell>Energy(KWH)</CTableHeaderCell>
            <CTableHeaderCell>Energy per Good Production(KW)</CTableHeaderCell>
            <CTableHeaderCell>Energy per Total Production</CTableHeaderCell>
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
                <CTableDataCell>{moment(data.timestamp).format('DD-MM-YYYY')}</CTableDataCell>
                <CTableDataCell>{data.Energy}</CTableDataCell>
                <CTableDataCell>{data.enrgyPerGood}</CTableDataCell>
                <CTableDataCell>{data.energyPerTotal}</CTableDataCell>
             
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="7">
                No Dates Selected/No Data in Selected Dates
              </CTableDataCell>
            </CTableRow>
          )}
          <CTableRow>
              <CTableHeaderCell colSpan="2" style={{textAlign:"right"}} >
                Total:
              </CTableHeaderCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
          
              </CTableRow>
            <CTableRow>
            <CTableHeaderCell colSpan="2" rowSpan="1" style={{textAlign:"Right"}}>
                Operator Sign:
              </CTableHeaderCell>   
            </CTableRow>
            <CTableRow>
            <CTableHeaderCell colSpan="2" rowSpan="1" style={{textAlign:"Right"}}>
            Production Suprevisor Sign:
              </CTableHeaderCell>   
            </CTableRow>
        </CTableBody>
      </CTable>
    </>
  );
}

export default EnergyReport;
