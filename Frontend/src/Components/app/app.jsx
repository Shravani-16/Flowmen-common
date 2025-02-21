import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from '../Navbar/SideBar';
import { Grid } from '@mui/material';
import { Analytics, Config, Console, Dashboard, Mould, Product, Report } from '../pages';
import Supervisor from '../pages/Configuration/Supervisor';
import Operator from '../pages/Configuration/utility/Operator';
import QualityController from '../pages/Configuration/utility/QualityController';



function WApp() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (


    <BrowserRouter>

      <div className='grid-container' style={{ gridTemplateColumns: isOpen ? '222px 1fr' : '49px 1fr' }}>
        <Grid item lg={isOpen ? 4 : 1} style={{ width: '100%' }}>
          <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
        </Grid>
          
        
          <Routes>
            <Route path="/" element={<Dashboard isOpen={isOpen} toggle={toggleSidebar} />} />
            <Route path="/dashboard" element={<Dashboard isOpen={isOpen} toggle={toggleSidebar} />} />
            <Route path="/console" element={<Console />} />
            <Route path="/report" element={<Report  isOpen={isOpen}/>} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/mould" element={<Mould />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/product" element={<Product />} />
            <Route path="/supervisor" element={<Supervisor  isOpen={isOpen} toggle={toggleSidebar} />} />
            {/* <Route path="/configuration" element={<Config  isOpen={isOpen} toggle={toggleSidebar} />} /> */}
            <Route path="/operatorConfig" element={<Operator  isOpen={isOpen} toggle={toggleSidebar} />} />
            <Route path="/qualityc" element={<QualityController  isOpen={isOpen} toggle={toggleSidebar} />} />
          </Routes>
      </div>
      
    </BrowserRouter >


  )
}

export default WApp
