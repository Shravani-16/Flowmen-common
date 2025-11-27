import React, { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetThresh from "./utility/SetThresh";

const Component = styled(Box)`
  margin-top: 9%;
  margin-left: 2%;
  justify-content: center;
  height: auto;
  margin-bottom: 2% !important;

  @media (max-width: 600px) {
    margin-top: 20%;
    margin-left: 5%;
  }
`;

const Header = styled(Box)`
  margin: 3%;
  border-bottom: 2px solid lightgray;
  text-align: left;

  @media (max-width: 650px) {
    margin: 5%;
    text-align: center;
  }
`;

const Container = styled(Box)`
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 650px) {
    max-width: 1200px; /* Adjusted maximum width */
  }

  @media (max-width: 650px) {
    padding: 10px;
  }
`;

const navItems = ["Set Thresh", "Executed Thresh", "Pending Thresh"];
const parameters = [
  { name: "Availability", id: "availability" },
  { name: "Production Count", id: "productionCount" },
  { name: "OEE", id: "oee" },
  { name: "Downtime", id: "downtime" },
];

const Navbar = styled(Box)`
  display: flex;
  gap: 30px;
  color: gray;
  margin-top: 2%;
`;

const NavItem = styled(Typography)`
  cursor: pointer;
  position: relative;
  ${(props) => props.isActive ? `
    color: #333;
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #333;
    }
  `:""}
`;

function Thresh() {
  const [selectedItem, setSelectedItem] = useState(navItems[0]); // Default to the first item

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const [limits, setLimits] = useState({
    set: initializeLimits(),
    executed: initializeLimits(),
    pending: initializeLimits(),
  });

  function initializeLimits() {
    const initialLimits = {};
    parameters.forEach(param => {
      initialLimits[param.id] = { low: "", mid: "", high: "", current: "", notify: false };
    });
    return initialLimits;
  }

  const handleLimitChange = (item, id, field, value) => {
    setLimits((prev) => ({
      ...prev,
      [item]: {
        ...prev[item],
        [id]: {
          ...prev[item][id],
          [field]: value,
        },
      },
    }));
  };

  const handleSwitchChange = (item, id) => {
    setLimits((prev) => ({
      ...prev,
      [item]: {
        ...prev[item],
        [id]: {
          ...prev[item][id],
          notify: true,
        },
      },
    }));

    toast.success(`${id} Threshold is set successfully!`);

    checkThreshold(item, id);
  };

  const checkThreshold = (item, id) => {
    const { low, mid, high, current } = limits[item][id];
    const lowLimit = parseFloat(low);
    const midLimit = parseFloat(mid);
    const highLimit = parseFloat(high);
    const currentValue = parseFloat(current);

    if (currentValue < lowLimit) {
      toast.error(`${id} is below the low limit!`);
    } else if (currentValue >= lowLimit && currentValue < midLimit) {
      toast.warn(`${id} is in the mid range.`);
    } else if (currentValue >= midLimit && currentValue <= highLimit) {
      toast.info(`${id} is in the high range.`);
    } else {
      toast.success(`${id} exceeds the high limit!`);
    }
  };

  return (
    <Component>
      <Header>
        <Typography sx={{ fontSize: { xs: 24, sm: 30 }, fontWeight: 600 }}>
          Threshold
        </Typography>
        <Navbar>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              isActive={selectedItem === item}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </NavItem>
          ))}
        </Navbar>
      </Header>
      <Container>
        {selectedItem === "Set Thresh" && (
          <SetThresh
            parameters={parameters}
            limits={limits.set}
            handleLimitChange={(id, field, value) => handleLimitChange("set", id, field, value)}
            handleSwitchChange={(id) => handleSwitchChange("set", id)}
            checkThreshold={(id) => checkThreshold("set", id)}
          />
        )}
        {/* Add other components for Executed and Pending as needed */}
        {/* Example:
        {selectedItem === "Executed" && (
          <ExecutedComponent />
        )}
        {selectedItem === "Pending" && (
          <PendingComponent />
        )}
        */}
        <ToastContainer />
      </Container>
    </Component>
  );
}

export default Thresh;
