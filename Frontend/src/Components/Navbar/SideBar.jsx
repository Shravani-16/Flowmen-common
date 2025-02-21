import React from 'react';
import {
  FaBars,
  FaTh,
  FaRegChartBar,
} from "react-icons/fa";
import { MdDataThresholding } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineLogout } from "react-icons/md";
import { SiWheniwork } from "react-icons/si";
import { GrUserWorker } from "react-icons/gr";
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = ({ children, isOpen, toggle }) => {
  const menuItem = [
    { path: "miniDash", name: "Mini-Dashboard", icon: <DashboardIcon /> },
    { path: "dashboard", name: "Dashboard", icon: <FaTh /> },
    { path: "report", name: "Report", icon: <TbReportAnalytics /> },
    { path: "supervisor", name: "Supervisor Screen", icon: <PermDataSettingIcon/> },
    { path: "qualityc", name: "QC Screen", icon: <SiWheniwork /> },
    { path: "operatorConfig", name: "Operator Screen", icon: <GrUserWorker /> },
    // { path: "config", name: "Configuration", icon: <PermDataSettingIcon /> },
    // { path: "filters", name: "Filters", icon: <FaRegChartBar /> },
    // { path: "Operator", name: "Operator Status", icon: <FaRegChartBar /> },
    // { path: "Thresh", name: "Theshold", icon: <MdDataThresholding   /> },
  ];

  const bItem = [
    { path: "setting", name: "Setting", icon: <IoSettingsOutline /> },
    { path: "/", name: "Logout", icon: <MdOutlineLogout /> },
  ];

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="top_section">
          <h1 className={`logo ${isOpen ? "show" : "hide"}`}>iStromen</h1>
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="menu_section">
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeclassname="active">
              <div className="icon">{item.icon}</div>
              <div className={`link_text ${isOpen ? "show" : "hide"}`}>{item.name}</div>
            </NavLink>
          ))}
        </div>
        <footer className="footer_section">
          {bItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeclassname="active">
              <div className="icon">{item.icon}</div>
              <div className={`link_text ${isOpen ? "show" : "hide"}`}>{item.name}</div>
            </NavLink>
          ))}
        </footer>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
