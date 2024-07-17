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
                <Container maxWidth="sm">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100vh"
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
                            style={{ marginTop: '16px' }}
                        >
                            Login
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default LoginPage;
