import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/login');
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                textAlign: 'center',
                backgroundColor: '#f8f9fa',
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Page Not Found OR Session Expired
            </Typography>
            <Typography variant="body1" gutterBottom>
                Go to login page
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNavigate}
                sx={{ marginTop: 2 }}
            >
                Login
            </Button>
        </Container>
    );
};

export default PageNotFound;
