import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";

function QualityReport({ dates }) {
  const [isOpen, setIsOpen] = useState(true);
  const [reportData, setQtyReportData] = useState([]);
  const componentPDF = useRef();

  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "Quality Report",
  //   onAfterPrint: () => alert("Data downloaded successfully"),
  // });

  // API for the report
  const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getQualityReport/get-qualityReport/?start=${dates[0]}&stop=${dates[1]}`;

  useEffect(() => {
    const fetchQtyReportData = async () => {
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
        console.log(responseData);
        setQtyReportData(responseData); // Assuming responseData contains the data in the required format
      } catch (error) {
        console.error(error);
      }
    };

    fetchQtyReportData();
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
            {/* <CTableHeaderCell scope="col">Product Name</CTableHeaderCell> */}
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ok Quality</CTableHeaderCell>
            <CTableHeaderCell scope="col">Not Ok Quality</CTableHeaderCell>
            <CTableHeaderCell scope="col">% Rejection</CTableHeaderCell>
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
                {/* <CTableDataCell>{data.productName}</CTableDataCell> */}
                <CTableDataCell>{data.timestamp}</CTableDataCell>
                <CTableDataCell>{data.Ok}</CTableDataCell>
                <CTableDataCell>{data.NotOk}</CTableDataCell>
                <CTableDataCell>{Math.floor((Math.abs(data.Ok - data.NotOk)/data.Ok)*100)}%</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="10">
                No Dates Selected/No Data in Selected Dates
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </>
  );
}

export default QualityReport;
