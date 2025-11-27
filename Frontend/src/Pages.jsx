import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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

  body::-webkit-scrollbar-track {
    background: #e8f5e8;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #66bb6a;
    border-radius: 10px;
    border: 3px solid #e8f5e8;
  }

  body::-webkit-scrollbar-thumb:hover {
    background: #4caf50;
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
