import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function MapPage() {
    const [locations, setLocations] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/locations');
                console.log('Fetched locations:', response.data); // Print the received data to the console
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations', error);
            }
        };

        fetchLocations();
    }, []);

    const fetchCityData = async (city) => {
        try {
            const response = await axios.get(`http://localhost:5500/api/data/${city}`);
            setSelectedData(prevData => [...prevData, ...response.data]);
        } catch (error) {
            console.error('Error fetching city data', error);
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <h1>Map Page</h1>
            <MapContainer center={[28.61, 77.23]} zoom={5} style={{ width: '80%', height: '90vh', margin: '10%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={[location.lat, location.lng]}
                        icon={L.icon({
                            iconUrl: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" stroke="none" /><rect x="2.5" y="4.5" width="19" height="15" rx="1.5" ry="1.5" fill="none" /></svg>',
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
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '300px', maxHeight: '90vh', overflowY: 'scroll', backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
                <h2>Selected Data</h2>
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            {/* Add more headers as per your data structure */}
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.city}</td>
                                <td>{data.lat}</td>
                                <td>{data.lng}</td>
                                {/* Add more columns as per your data structure */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MapPage;
