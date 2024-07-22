import React from 'react';
import { Button, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
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
        <Box sx={{ flexGrow: 1, height: '100vh', bgcolor: '#A0B9F9' }}> {/* Set background color to blue */}
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}> {/* Set navbar color to white */}
                <Toolbar>
                    <Box display="flex" alignItems="center">
                        <img 
                            src={`${process.env.PUBLIC_URL}/Jio-Logo.jpg`} 
                            alt="Jio Logo" 
                            style={{ width: 40, marginRight: 16 }} // Adjust the width to fit the navbar
                        />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Jio Platforms Limited
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4 }}> {/* Adjust the maxWidth to lg for larger container */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '80vh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            width: '50%',
                        }}
                    >
                        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
                            Welcome to Jio 
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogin}
                            sx={{ mb: 2, width: 200 }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleRegister}
                            sx={{ mb: 2, width: 200 }}
                        >
                            Register
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img 
                            src={`${process.env.PUBLIC_URL}/right_side_image.png`} 
                            alt="Welcome" 
                            style={{ maxWidth: '100%', height: 'auto' }} // Adjust the image size
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HomePage;
