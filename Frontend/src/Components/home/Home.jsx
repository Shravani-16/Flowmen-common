import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, IconButton, Badge, styled, Typography } from "@mui/material";
import { DropButton } from "../pages/containts/index.js";
import { useSelector } from "react-redux";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notification from "./Utility/Notification.jsx";
import { FaUserPlus, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import barData from "../pages/api/barData.js";

// CSS Components
const Icons = styled(Grid)`
  display: flex;
  align-items: right;
  float: right;
  marginLeft: auto;
  @media (max-width: 700px) {
    max-width: 38%;
    height: 32px;
  }
`;

const Header = styled(Grid)`
  display: flex;
  width: 100%;
  margin-left: auto;
  align-content: center;
  margin-top: 0.3%;
  z-index: 1;

  @media (max-width: 480px) {
    margin-right: 0;
    width: 96% !important;
  }
`;

const Container = styled(Box)(({ isOpen }) => ({
  position: "fixed",
  display: "block",
  zIndex: 7,
  width: isOpen ? "87%" : "98%",
  "@media (max-width: 480px)": {
    width: "90% !important",
    height: "51px",
    marginLeft: "20px",
  },
  "@media (min-width: 481px) and (max-width: 700px)": {
    width: isOpen ? "85%" : "95%",
  },
  "@media (min-width: 701px) and (max-width: 1024px)": {
    width: isOpen ? "80%" : "90%",
  },
}));

const TitleText = styled(Typography)`
  font-size: 28px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
  @media (min-width: 481px) and (max-width: 700px) {
    font-size: 20px;
  }
  @media (min-width: 701px) and (max-width: 1024px) {
    font-size: 24px;
  }
`;

const Home = ({ isOpen }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [username, setUsername] = useState("");
  const [miniData, setMiniData] = useState("");
  const [previousData, setPreviousData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const downNote = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
      if (downNote.current && !downNote.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await barData();
        if (data) {
          setMiniData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
    }
  }, [userData]);

  useEffect(() => {
    const checkMachineStatus = () => {
      if (miniData && JSON.stringify(miniData) !== JSON.stringify(previousData)) {
        setPreviousData(miniData);

        const currentTime = new Date();
        const timestamp = new Date(miniData[0]?.timestamp);
        const durationMs = currentTime - timestamp;
        const isMachineDown = miniData[0]?.MdownS === 1;

        const message = isMachineDown ? "Machine Down" : "Machine Running";
        let formattedDuration = "";
        if (isMachineDown) {
          const durationHrs = Math.floor(durationMs / (1000 * 60 * 60));
          const durationMin = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
          formattedDuration = `${durationHrs} hr ${durationMin} min ago`;
        }
        const formattedDate = `${timestamp.getDate().toString().padStart(2, "0")}/${(timestamp.getMonth() + 1).toString().padStart(2, "0")}/${timestamp.getFullYear()}`;

        setNotifications([
          {
            id: 1,
            message: message,
            duration: formattedDuration,
            date: formattedDate,
          },
        ]);
      }
    };

    const interval = setInterval(checkMachineStatus, 1000); // Check every second
    return () => clearInterval(interval);
  }, [miniData, previousData]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const toggleDropDown = () => {
    setVisible((prev) => !prev);
  };

  const notificationCount = notifications.length;

  return (
    <Container
      isOpen={isOpen}
      className="header"
      style={{
        width: isOpen ? "87%" : "98%",
        zIndex: 7,
      }}
    >
      <BootstrapNavbar expand="lg">
        <Header container alignItems="center" justifyContent="space-between">
          <Grid
            item
            lg={10}
            md={8}
            sm={7}
            xs={7}
            sx={{
              color: "#fff",
              fontFamily: "serif",
              textDecorationLine: "overline",
              textDecorationColor: "#444d69db",
            }}
          >
            <TitleText>{userData.companyName}</TitleText>
          </Grid>
          <Icons
            item
            lg={1}
            md={2}
            sm={4}
            xs={4}
            ref={dropdownRef}
            className="drop-button-container"
          >
            {userData.role === "Admin" && (
              <IconButton
                sx={{ color: "#1b5e20" }}
                onClick={() =>
                  navigate("setting", { state: { selectedItem: 2 } })
                }
              >
                <FaUserPlus className="IconSize" />
              </IconButton>
            )}
            <IconButton sx={{ color: "#1b5e20" }} onClick={toggleDropDown}>
              <FaUser className="IconSize" />
            </IconButton>
            <IconButton sx={{ color: "#1b5e20" }} onClick={toggleNotifications}>
              <Badge badgeContent={notificationCount} color="error">
                {showNotifications ? (
                  <NotificationsActiveIcon sx={{ fontSize: 30 }} />
                ) : (
                  <NotificationsIcon sx={{ fontSize: 30 }} />
                )}
              </Badge>
            </IconButton>
          </Icons>
        </Header>
      </BootstrapNavbar>

      <DropButton username={username} show={visible} />
      <div ref={downNote}>
        {showNotifications && (
          <Notification
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
      </div>
    </Container>
  );
};

export default Home;
