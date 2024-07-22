import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5500/api/users/login', { username, password });
            if (response.data.message === 'Login successful') {
                navigate('/hello');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <CssBaseline />
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
                            <Typography variant="h4" component="h1" gutterBottom>
                                Login
                            </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            <TextField
                                label="Username"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleLogin}
                                sx={{ mt: 2 }}
                            >
                                Login
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
        </>
    );
};

export default LoginPage;
