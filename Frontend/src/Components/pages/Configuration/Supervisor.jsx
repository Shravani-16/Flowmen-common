import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OneTime from "./utility/OneTime";
import ShiftWise from "./utility/ShiftWise";
// import QualityController from "./utility/QualityController";
// import Operator from "./utility/Operator";

const Component = styled(Box)`
  margin-top: 7%;
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
    max-width: 1200px;
  }

  @media (max-width: 650px) {
    padding: 10px;
  }
`;

const navItems = ["One Time", "Shift Wise",];

const Navbar = styled(Box)`
  display: flex;
  gap: 30px;
  color: gray;
  margin-top: 2%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const NavItem = styled(Typography)`
  cursor: pointer;
  position: relative;
  transition: color 0.1s ease-in-out, transform 0.1s ease-in-out;

  &:hover {
    color: hsl(215.84deg 100% 15.1%);
    transform: scale(1.1);
  }

  ${(props) =>
    props.isActive
      ? `
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
  `
      : ""}
`;

function Configuration() {
  const [selectedItem, setSelectedItem] = useState(navItems[0]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Component>
      <Header>
        <Typography
          sx={{
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 600,
            color: "hsl(215.84deg 100% 15.1%)",
          }}
        >
          Supervisor Screen
        </Typography>
        <Navbar>
          {navItems.map((item) => (
            <NavItem
              key={item}
              onClick={() => handleItemClick(item)}
              isActive={selectedItem === item}
            >
              {item}
            </NavItem>
          ))}
        </Navbar>
      </Header>
      <Container>
        {selectedItem === "One Time" && <OneTime />}
        {selectedItem === "Shift Wise" && <ShiftWise />}
        {/* {selectedItem === "Quality Controller" && <QualityController />}
        {selectedItem === "Operator" && <Operator />} */}
      </Container>
      <ToastContainer />
    </Component>
  );
}

export default Configuration;
