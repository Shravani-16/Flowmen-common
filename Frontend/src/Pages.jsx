import React from 'react';
import { Box, styled } from '@mui/material';
import Sidebar from './Components/Navbar/SideBar';
import Home from './Components/home/Home';
import { Outlet } from 'react-router-dom';

const HomeComponent = styled(Box)(({ isOpen }) => ({
  marginLeft: isOpen ? '202px' : '30px',
}));
const NestedComponent = styled(Box)(({ isOpen }) => ({
  margin: isOpen ? "4% 0% 0% 14%":"4% 0% 0% 3%"
}))
const PComponent = styled(Box)`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @supports (-ms-overflow-style: none) {
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
`;

function Pages({ isOpen, toggle }) {
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <HomeComponent isOpen={isOpen}>
        <Home isOpen={isOpen} />
      </HomeComponent>
      <NestedComponent isOpen={isOpen}>
        <Outlet />
      </NestedComponent>
    </>
  );
}

export default Pages;
