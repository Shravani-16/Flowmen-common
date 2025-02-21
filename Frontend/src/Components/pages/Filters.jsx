import React, { useEffect, useState } from 'react';
import { getFilters, postFilters, } from './api';
import Sidebar from '../Navbar/SideBar';
import { Box, Grid, Button as MuiBtn, Typography } from '@mui/material';
import Home from '../home/Home';
import RefreshIcon from "@mui/icons-material/Refresh";
import { Form } from 'react-bootstrap';

function Filters({ isOpen, toggle }) {
    const [filters, setFilters] = useState({});
    const [selectedValues, setSelectedValues] = useState({
        plantId: '',
        lineId: '',
        machineId: '',
        mouldId: '',
        productId: ''
    });
    const [editingKey, setEditingKey] = useState(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const fetchedFilters = await getFilters();
                setFilters(fetchedFilters);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFilters();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (value === 'add-new') {
            setEditingKey(name);
        } else {
            setSelectedValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
            setEditingKey(null); // Clear editing key if any other option is selected
        }
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Save selectedValues object or handle the form submission as needed
        console.log('Submitted Values:', selectedValues);
        postFilters(selectedValues)
        setSelectedValues({
            plantId: '',
            lineId: '',
            machineId: '',
            mouldId: '',
            productId: ''
        })
    };
    // console.log(filters)
    return (

        <div style={{ justifyContent: "center", overflow: "inherit" ,display:'flow-root'}}>

            {/*<------Navbar------> */}
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
                            sx={{
                                color: "hsl(215.84deg 100% 15.1%)",
                                fontWeight: 800,
                                marginTop: "4px",
                                alignItems: "center",
                            }}
                        >
                            Filters
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
            <div style={{ margin: '6%' }}>
                <Form onSubmit={handleSubmit}>
                    {Object.keys(selectedValues).map((key) => (
                        <Form.Group controlId={key} key={key} style={{ marginBottom: '10px' }}>
                            <Form.Label>{key}</Form.Label>
                            {editingKey === key ? (
                                <Form.Control
                                    type="text"
                                    name={key}
                                    value={selectedValues[key]}
                                    onChange={handleEditChange}
                                    placeholder={`Enter new ${key}`}
                                    size="lg"
                                />
                            ) : (
                                <Form.Select
                                    name={key}
                                    value={selectedValues[key]}
                                    onChange={handleChange}
                                    size="lg"
                                >
                                    <option value="">Select {key}</option>
                                    {/* Replace with your actual options */}
                                    {Object.keys(filters).map((item, index) => (
                                        <option key={index} value={filters[item][key]}>
                                            {filters[item][key]}
                                        </option>
                                    ))}
                                    <option value="add-new">
                                        Add new {key}
                                    </option>
                                </Form.Select>
                            )}
                        </Form.Group>
                    ))}
                    <MuiBtn type="submit" sx={{ marginTop: '20px', backgroundColor: 'hsl(215.84deg 100% 15.1%)', color: '#fff' }}>
                        Submit
                    </MuiBtn>
                </Form>
            </div>
        </div>

    );
}

export default Filters;
