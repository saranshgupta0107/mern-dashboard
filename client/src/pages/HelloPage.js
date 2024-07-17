import React, { useState } from 'react';
import { Button, Container, Typography, Box, AppBar, Toolbar, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HelloPage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5500/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    const handleMap = () => {
        navigate('/map'); // Navigate to the map page
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
                        height="80vh"
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Hello
                        </Typography>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            style={{ margin: '20px 0' }}
                        />
                        <Button
                            variant="contained"
                            color="secondary" // Change button color to secondary
                            onClick={handleUpload}
                        >
                            Upload CSV
                        </Button>
                        {message && <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>{message}</Typography>}
                        <Button
                            variant="contained"
                            color="secondary" // Change button color to secondary
                            onClick={handleMap}
                            sx={{ mt: 2, width: 200 }} // Add margin top to separate buttons
                        >
                            Map
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default HelloPage;
