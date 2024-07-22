import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
        <div style={{ width: '100%', height: '100vh' }}>
            <h1>Map Page</h1>
            <div style={{ position: 'absolute', top: '30%', left: '10px', width: '80px', backgroundColor: 'white', padding: '10px', border: '1px solid black', zIndex: 1000 }}>
    <h2>Legend</h2>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[90, 80, 70, 60, 50, 40, 30, 20, 10].map((value, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <div style={{ backgroundColor: getColor(value), width: '20px', height: '20px', border: '1px solid black' }}></div>
                <span style={{ marginLeft: '10px' }}>{value}+</span>
            </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: getColor(0), width: '20px', height: '20px', border: '1px solid black' }}></div>
            <span style={{ marginLeft: '10px' }}>0-9</span>
        </div>
    </div>
</div>

            <MapContainer center={[28.61, 77.23]} zoom={5} style={{ width: '80%', height: '90vh', margin: '10%' }}>
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
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '400px', height: '145px', overflowY: 'scroll', backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>KPI</th>
                            <th>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.city}</td>
                                <td>{data.lat}</td>
                                <td>{data.lng}</td>
                                <td>{data.KPI || 'N/A'}</td> {/* Display KPI value or 'N/A' if undefined */}
                                <td>
                                    <div
                                        style={{
                                            backgroundColor: getColor(parseFloat(data.KPI)),
                                            width: '20px',
                                            height: '20px',
                                            border: '1px solid black'
                                        }}
                                    ></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MapPage;
