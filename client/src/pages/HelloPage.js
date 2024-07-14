// src/pages/HelloPage.js
import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
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
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
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
                    color="primary"
                    onClick={handleUpload}
                >
                    Upload CSV
                </Button>
                {message && <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>{message}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMap}
                    sx={{ mt: 2, width: 200 }} // Add margin top to separate buttons
                >
                    Map
                </Button>
            </Box>
        </Container>
    );
};

export default HelloPage;
