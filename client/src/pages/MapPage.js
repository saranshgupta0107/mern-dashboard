import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Container, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Function to get color based on KPI value
const getColor = (kpi) => {
    if (kpi >= 90) return '#800026'; // Dark Red
    if (kpi >= 80) return '#BD0026';
    if (kpi >= 70) return '#E31A1C';
    if (kpi >= 60) return '#FC4E2A';
    if (kpi >= 50) return '#FD8D3C';
    if (kpi >= 40) return '#FEB24C';
    if (kpi >= 30) return '#FED976';
    if (kpi >= 20) return '#FFEDA0';
    if (kpi >= 10) return '#FFFFCC';
    return '#FFEDA0'; // Light Yellow
};

function MapPage() {
    const [locations, setLocations] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/locations');
                console.log('Fetched locations:', response.data); // Print the fetched locations to the console
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations', error); // Print any errors to the console
            }
        };

        fetchLocations();
    }, []);

    const fetchCityData = async (city) => {
        try {
            const response = await axios.get(`http://localhost:5500/api/data/${city}`);
            console.log('Fetched data for city:', city, response.data); // Print the fetched data for the specific city to the console
            setSelectedData(prevData => [...prevData, ...response.data]);
        } catch (error) {
            console.error('Error fetching city data', error); // Print any errors to the console
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                Map Page
            </Typography>
            <Box sx={{ position: 'relative', height: '80vh', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                <MapContainer center={[28.61, 77.23]} zoom={5} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            position={[location.lat, location.lng]}
                            icon={L.divIcon({
                                className: 'custom-div-icon',
                                html: `<div style="background-color: ${getColor(parseFloat(location.KPI))}; border: 1px solid black; padding: 5px; color: white; cursor: pointer;">${location.city}</div>`,
                                iconSize: [40, 40]
                            })}
                        >
                            <Popup>
                                <div
                                    style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px', color: 'red', cursor: 'pointer' }}
                                    onClick={() => fetchCityData(location.city)}
                                >
                                    {location.city}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        left: '10px',
                        backgroundColor: 'white',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        zIndex: 1000,
                        width: '200px',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Legend
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        {[90, 80, 70, 60, 50, 40, 30, 20, 10].map((value, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={0.5}>
                                <Box
                                    sx={{
                                        backgroundColor: getColor(value),
                                        width: '20px',
                                        height: '20px',
                                        border: '1px solid black',
                                        mr: 1,
                                    }}
                                ></Box>
                                <Typography>{value}+</Typography>
                            </Box>
                        ))}
                        <Box display="flex" alignItems="center">
                            <Box
                                sx={{
                                    backgroundColor: getColor(0),
                                    width: '20px',
                                    height: '20px',
                                    border: '1px solid black',
                                    mr: 1,
                                }}
                            ></Box>
                            <Typography>0-9</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell>KPI</TableCell>
                            <TableCell>Color</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.city}</TableCell>
                                <TableCell>{data.lat}</TableCell>
                                <TableCell>{data.lng}</TableCell>
                                <TableCell>{data.KPI || 'N/A'}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            backgroundColor: getColor(parseFloat(data.KPI)),
                                            width: '20px',
                                            height: '20px',
                                            border: '1px solid black',
                                        }}
                                    ></Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MapPage;
