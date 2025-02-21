import React, { useState, useId, useEffect } from "react";
import Home from "../../home/Home";
import { Box, Grid, Typography, Button as MuiBtn, styled } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Sidebar from "../../Navbar/SideBar";
import Register from "../login-reg/Register";


//Components

const Component = styled(Box)`
margin-top:6%
`
function RegisterCom({ isOpen, toggle }) {
    return (
        <div
            className="grid-container"
            style={{ gridTemplateColumns: isOpen ? "222px 1fr" : "49px 1fr" }}
        >
            {/*<---------Slider---------> */}
            <Grid item lg={isOpen ? 4 : 1} style={{ width: "100%" }}>
                <Sidebar isOpen={isOpen} toggle={toggle} />
            </Grid>

            <div style={{ justifyContent: "center", overflow: "inherit" }}>
                {/*<-----------Header-----------> */}
                <div style={{ height: '70px', justifyContent: 'center', width: isOpen ? '90%' : '98%', position: 'relative', zIndex: 2 }}>
                    <Home isOpen={isOpen} toggle={toggle} />
                </div>
                {/*<-----------Mini Header-----------> */}
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
                                Member Registration
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
                <Component>
                    <Register />
                </Component>
            </div>
        </div>
    )
}

export default RegisterCom
