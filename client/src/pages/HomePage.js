// src/pages/HomePage.js
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    style={{ marginTop: '16px', width: '200px' }}
                >
                    Login
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRegister}
                    style={{ marginTop: '16px', width: '200px' }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;
