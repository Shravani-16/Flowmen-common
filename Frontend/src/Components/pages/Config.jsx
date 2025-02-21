import React, { useState, useId, useEffect } from "react";
import Home from "../home/Home";
import { Form, Button, Table, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Box, Grid, Typography, Button as MuiBtn } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { userData } from "../api";
import Popup from "./containts/Popup";
import Sidebar from "../Navbar/SideBar";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import getDeviceID from "./api/getDeviceid";

const Config = ({ isOpen, toggle }) => {
  const id = useId();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setToast(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [toast]);

  const [formData, setFormData] = useState({
    device_id: "",
    actual_production: "",
    ideal_cycle_time: "",
    plannedProductionTime: "",
    expected_production: "",
    shift_start: "",
    shift_end: "",
    tool_change: "",
    planned_downtime: "",
    good_production: "",
    rejected_production: "",
    operator_change: "",
    ideal_parts_weight: "",
    downtimeReason: "",
    rejectReason: "",
    batchNo: "",
    mouldID: "",
    prodName: "",
    macNo: ""
  });

  const [data, setData] = useState({});

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (
      name === "actual_production" ||
      name === "expected_production" ||
      name === "good_production" ||
      name === "rejected_production" ||
      name === "planned_downtime" ||
      name === "operator_change" ||
      name === "plannedProductionTime" ||
      name === "ideal_parts_weight" ||
      name === "macNo"
    ) {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
    }
  };

  const handleDeviceChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      device_id: value,
    });
  };

  const convertTimeStringsToMilliseconds = (timeStrings) => {
    return timeStrings.map((timeString) => {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, seconds, 0);
      return date.getTime() - date.setHours(0, 0, 0, 0);
    });
  };

  const handleDateChange = (date, dateString) => {
    setFormData({
      ...formData,
      operator_change: dateString,
    });
  };

  const handleTimeChange = (target) => (times, timeStrings) => {
    const millisecondsArray = convertTimeStringsToMilliseconds(timeStrings);
    const totalMilliseconds = millisecondsArray.reduce((acc, ms) => acc + ms, 0);
    setFormData({
      ...formData,
      [target]: totalMilliseconds,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    let isFormFilled = true;

    for (let key in formData) {
      if (typeof formData[key] === "string" && formData[key].trim() === "") {
        isFormFilled = false;
        break;
      }
      if (Array.isArray(formData[key]) && formData[key].length === 0) {
        isFormFilled = false;
        break;
      }
    }
    if (isFormFilled) {
      console.log(data);
      const response = userData(data);
      setError(false);
      setToast(true);
      // setFormData({
      //   device_id: "",
      //   ideal_cycle_time: "",
      //   expected_production: "",
      //   actual_production: "",
      //   shift_start: "",
      //   shift_end: "",
      //   tool_change: "",
      //   planned_downtime: "",
      //   good_production: "",
      //   rejected_production: "",
      //   operator_change: "",
      //   ideal_parts_weight: "",
      //   plannedProductionTime: "",
      //   downtimeReason: "",
      //   rejectReason: "",
      //   batchNo: "",
      //   mouldID: "",
      //   prodName: "",
      //   macNo: ""
      // });
      {
        response ? (
          (
            setAlert(false),
            setToast(true)
          )
        ) : (
          (
            setError(true),
            setAlert(true),
            setToast(true)
          )
        )
      }
    } else {
      setError(true);
      setAlert(true);
      setToast(true);
    }
  };

  const handleUpdate = (value, target) => {
    if (formData.hasOwnProperty(target)) {
      setData({
        ...data,
        [target]: value,
      });
    } else {
      console.log(`Key '${target}' does not exist in the formData object.`);
    }
    console.log(data);
  };

  const obj = [
    { lable: "Ideal cycle time", placeholder: "Enter Value", name: "ideal_cycle_time", value: formData.ideal_cycle_time, type: "text", step: "1" },
    { lable: "Planned Production Time", placeholder: "Enter Value in Miliseconds", name: "plannedProductionTime", value: formData.plannedProductionTime, type: "number", step: "1" },
    { lable: "Shift Start Time", placeholder: "Enter Value", name: "shift_start", value: formData.shift_start, type: "text", step: "1" },
    { lable: "Shift End Time", placeholder: "Enter Value", name: "shift_end", value: formData.shift_end, type: "text", step: "1" },
    // { lable: "Tool Change", placeholder: "Enter Value", name: "tool_change", value: formData.tool_change, type: "text", step: "1" },
    { lable: "Ideal Parts weight", placeholder: "Enter Value", name: "ideal_parts_weight", value: formData.ideal_parts_weight, type: "text", step: "1" },
    // { lable: "Actual Production", placeholder: "0", name: "actual_production", value: formData.actual_production, type: "number", step: "1" },
    { lable: "Expected Production", placeholder: "0", name: "expected_production", value: formData.expected_production, type: "number", step: "1" },
    { lable: "Goods Production Quantity", placeholder: "0", name: "good_production", value: formData.good_production, type: "number", step: "1" },
    { lable: "Rejected Production Quantity", placeholder: "0", name: "rejected_production", value: formData.rejected_production, type: "number", step: "1" },
    { lable: "Downtime Reason", placeholder: "Enter Reason", name: "downtimeReason", value: formData.downtimeReason, type: "text", step: "1" },
    { lable: "Reject Reason", placeholder: "Enter Reason", name: "rejectReason", value: formData.rejectReason, type: "text", step: "1" },
    { lable: "Batch No.", placeholder: "Enter Batch No.", name: "batchNo", value: formData.batchNo, type: "text", step: "1" },
    { lable: "Mould ID", placeholder: "Enter Mould ID", name: "mouldID", value: formData.mouldID, type: "text", step: "1" },
    { lable: "Product Name", placeholder: "Enter Product Name", name: "prodName", value: formData.prodName, type: "text", step: "1" },
    { lable: "Machine No.", placeholder: "Enter Machine No.", name: "macNo", value: formData.macNo, type: "text", step: "1" }
  ];

  const [deviceId, setDeviceId] = useState(null);
  useEffect(() => {
    const storeDeviceId = async () => {
      try {
        const id = await getDeviceID();
        setDeviceId(id);
      } catch (error) {
        console.error('Failed to store device ID:', error);
      }
    };

    storeDeviceId();
  }, []);

  return (
    <div>
      <div style={{ justifyContent: "center", overflow: "inherit" }}>
        <div
          className="header"
          style={{
            backgroundColor: "hsl(0deg 0% 95.29%)",
            display: "flex",
            position: "fixed",
            marginTop: "0%",
            width: isOpen ? "89%" : "100%",
            padding: '0% 2% 0% 1%'
          }}
        >
          <Grid
            columnSpacing={2}
            sx={{ display: "flex", float: "left", width: "97%" }}
          >
            <Grid item lg={7} sx={{ display: "inline-block", float: "left" }}>
              <Typography
                style={{
                  color: "hsl(215.84deg 100% 15.1%)",
                  fontWeight: 800,
                  marginTop: "4px",
                  alignItems: "center",
                }}
              >
                Configurations
              </Typography>
            </Grid>
            <Grid
              item
              lg={5}
              sx={{ marginLeft: "auto", boxShadow: "none", float: "right" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MuiBtn
                  sx={{ color: "hsl(215.84deg 100% 15.1%)", fontWeight: 550 }}
                >
                  <RefreshIcon />
                </MuiBtn>
              </Box>
            </Grid>
          </Grid>
        </div>

        {toast && (
          <div
            style={{
              zIndex: 10,
              position: "fixed",
              right: "0px",
              marginTop: "9%",
            }}
          >
            <Popup
              setToast={setToast}
              alert={alert}
              error={error}
              backgroundColor="red"
            />
          </div>
        )}

        <div style={{ padding: "8% 4% 2% 8%" }}>
          <tbody>
            <tr>
              <td>
                <Form>
                  <Form.Select
                    aria-label="Default select example"
                    size="lg"
                    value={formData.device_id}
                    onChange={handleDeviceChange}
                  >
                    <option value="">Select Device</option>
                    {deviceId && deviceId.map((item, index) => (
                      <option key={index} value={item.device_id}>
                        Device_{index + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Form>
              </td>
            </tr>
          </tbody>
          <Table style={{ marginTop: '2%' }}>
            {obj.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td style={{ width: "1px" }}>{index + 1}</td>
                  <td>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor={id}>{item.lable}</Form.Label>
                        <Form.Control
                          id={id}
                          type={item.type}
                          placeholder={item.placeholder}
                          name={item.name}
                          value={item.value}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Form>
                  </td>
                  <td
                    className="justify-content-center"
                    style={{ width: "17vw" }}
                  >
                    <Container style={{ margin: "14%" }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          handleUpdate(item.value, item.name)
                        }
                      >
                        Update
                      </Button>
                      &nbsp;
                    </Container>
                  </td>
                </tr>
              </tbody>
            ))}
            <tbody>
              <tr>
                <td style={{ width: "1px" }}>15</td>
                <td>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Planned Downtime Schedule</Form.Label>
                      <br />
                      <TimePicker.RangePicker
                        onChange={handleTimeChange("planned_downtime")}
                      />
                    </Form.Group>
                  </Form>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>16</td>
                <td>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor={id}>Operator change Schedule</Form.Label><br />
                      <TimePicker.RangePicker onChange={handleTimeChange("operator_change")} />
                    </Form.Group>
                  </Form>
                </td>
              </tr>
            </tbody>
          </Table>

          <Container className="d-flex justify-content-center">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip variant="light" id="button-tooltip-2">
                  Submit all the data
                </Tooltip>
              }
            >
              <Button variant="success" size="lg" onClick={handleSubmit}>
                Submit
              </Button>
            </OverlayTrigger>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Config;
