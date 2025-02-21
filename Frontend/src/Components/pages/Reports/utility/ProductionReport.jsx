import React, { useEffect, useState, useRef } from "react";
import moment from 'moment';
import { Box, styled } from '@mui/material'
import { useSelector } from "react-redux";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import getDeviceID from "../../api/getDeviceid";

// Styled component
const SelectBox = styled(Box)`
 display: flex;
  justify-content: space-between;
  width: 25%;
  padding: 2% 0%;
`;

const Select = styled(`select`)`
    color: #0a1b57;
    border-radius: 11px;
    height: 38px;
    background-color: #eecf4b;
    font-size: 17px;
    font-weight: 600;
`;

// Function to convert milliseconds to HH:MM:SS
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

const ProductionReport = ({ dates }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [deviceIdOptions, setDeviceIdOptions] = useState([]);
  const [machineIdOptions, setMachineIdOptions] = useState([]);
  const [reportData, setProdReportData] = useState(null);
  const componentPDF = useRef();
  
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');

  useEffect(() => {
    const storeDeviceId = async () => {
      try {
        const data = await getDeviceID();

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

  const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getProductionReport/get_productionReport/?machine_id=${selectedMachine}&start=${dates?.[0]}&stop=${dates?.[1]}&device_id=${selectedDevice}`;

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
        setProdReportData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProdReportData();
  }, [dates, selectedMachine, selectedDevice]);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleMachineChange = (event) => {
    setSelectedMachine(event.target.value);
  };

  return (
    <>
      <SelectBox>
        <Select value={selectedDevice} onChange={handleDeviceChange}>
          <option value="">Select Device</option>
          {deviceIdOptions && deviceIdOptions.map((item, index) => (
            <option key={index} value={item.id}>
              Device_{index + 1}
            </option>
          ))}
        </Select>
        <Select value={selectedMachine} onChange={handleMachineChange}>
          <option value="">Select machine</option>
          {machineIdOptions && machineIdOptions.map((item, index) => (
            <option key={index} value={item.id}>
              {item.id}
            </option>
          ))}
        </Select>
      </SelectBox>

      <p style={{ fontSize: "16px", fontWeight: "700" }}>
        Daily Production Report
      </p>
      <div ref={componentPDF}>
        <CTable bordered style={{ textAlign: "center", border: '1px solid #c7c7c7' }}>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell colSpan="3" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {userData.companyName}
              </CTableHeaderCell>
              <CTableHeaderCell colSpan="8" rowSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                DAILY PRODUCTION REPORT
              </CTableHeaderCell>
              <CTableHeaderCell colSpan="1" rowSpan="1">
                Doc. No.
              </CTableHeaderCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell colSpan="1">Rev. No.</CTableHeaderCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell colSpan="1">Rev. Date</CTableHeaderCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
            </CTableRow>
            <CTableRow style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <CTableHeaderCell colSpan="3">Machine No: {reportData?.[0]?.macNo}</CTableHeaderCell>
              <CTableHeaderCell colSpan="1"></CTableHeaderCell>
              <CTableHeaderCell colSpan={4}>Date: {dates[0] ? moment(dates[0]).format('DD-MM-YYYY') : ''} to {dates[1] ? moment(dates[1]).format('DD-MM-YYYY') : ''}</CTableHeaderCell>
              <CTableHeaderCell>Shift</CTableHeaderCell>
              <CTableHeaderCell colSpan="2"></CTableHeaderCell>
              <CTableHeaderCell>Operator</CTableHeaderCell>
              <CTableHeaderCell colSpan="2"></CTableHeaderCell>
            </CTableRow>
            <CTableRow style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <CTableHeaderCell>Sr. No</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Product Name</CTableHeaderCell>
              <CTableHeaderCell>Mould ID</CTableHeaderCell>
              <CTableHeaderCell>Customer</CTableHeaderCell>
              <CTableHeaderCell>Batch No</CTableHeaderCell>
              <CTableHeaderCell>Target Qty / Hr</CTableHeaderCell>
              <CTableHeaderCell>Actual Production</CTableHeaderCell>
              <CTableHeaderCell>OK Quantity</CTableHeaderCell>
              <CTableHeaderCell>Rejection Quantity</CTableHeaderCell>
              <CTableHeaderCell>
                Rejection Reason (Defect Name & Quantity)
              </CTableHeaderCell>
              <CTableHeaderCell>Down Time (Start to End)</CTableHeaderCell>
              <CTableHeaderCell>Down Time Reason</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {reportData?.length > 0 ? (
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
                  <CTableDataCell>{moment(data.production_date).format('DD-MM-YYYY')}</CTableDataCell>
                  <CTableDataCell>{data.productName}</CTableDataCell>
                  <CTableDataCell>{data.mouldId}</CTableDataCell>
                  <CTableDataCell>{data.customer}</CTableDataCell>
                  <CTableDataCell>{data.batchNo}</CTableDataCell>
                  <CTableDataCell>{data.targetQty}</CTableDataCell>
                  <CTableDataCell>{data.total_daily_production}</CTableDataCell>
                  <CTableDataCell>{data.okQty}</CTableDataCell>
                  <CTableDataCell>{data.rejectedQty}</CTableDataCell>
                  <CTableDataCell>{data.rejectedReason}</CTableDataCell>
                  <CTableDataCell>{convertMillisecondsToTime(data.downtime)}</CTableDataCell>
                  <CTableDataCell>{data.downtimeReason}</CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="13" style={{ textAlign: 'center' }}>
                  No Dates Selected/No Data in Selected Dates
                </CTableDataCell>
              </CTableRow>
            )}

            <CTableRow>
              <CTableHeaderCell colSpan="1">
                Total
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
              <CTableDataCell colSpan="1"></CTableDataCell>
              <CTableDataCell colSpan="1"></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell colSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>Operator Sign:</CTableHeaderCell>
              <CTableDataCell colSpan="2"></CTableDataCell>
              <CTableHeaderCell colSpan="2" style={{ textAlign: 'center', verticalAlign: 'middle' }}>Machine Start Counter:</CTableHeaderCell>
              <CTableDataCell colSpan="2"></CTableDataCell>
              <CTableHeaderCell colSpan="2" style={{ textAlign: 'center', verticalAlign: 'middle' }}>Operation Incharge Sign:</CTableHeaderCell>
              <CTableDataCell colSpan="2"></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell colSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle' }}>Production Supervisor Sign:  </CTableHeaderCell>
              <CTableDataCell colSpan="2"></CTableDataCell>
              <CTableHeaderCell colSpan="2" style={{ textAlign: 'center', verticalAlign: 'middle' }}>Machine End Counter:</CTableHeaderCell>
              <CTableDataCell colSpan="6"></CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </>
  );
};

export default ProductionReport;
