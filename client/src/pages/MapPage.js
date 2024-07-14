// src/pages/MapPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MapPage() {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [locations, setLocations] = useState([]);

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

    useEffect(() => {
        const initMap = () => {
            const mappls = window.mappls;
            const newMap = new mappls.Map('map', {
                center: { lat: 28.61, lng: 77.23 },
                zoom: 5
            });

            setMap(newMap);

            // Listen for zoom changes
            newMap.addListener('zoom_changed', updateMarkers);

            // Listen for drag end (map position changes)
            newMap.addListener('dragend', updateMarkers);

            return newMap;
        };

        const updateMarkers = () => {
            // Remove existing markers
            markers.forEach(marker => {
                marker.setMap(null);
            });

            // Add new markers and info windows
            const newMarkers = locations.map(location => {
                const infowindow = new window.mappls.InfoWindow({
                    content: `<div style="background-color: white; border: 1px solid black; padding: 5px; color: red;">${location.city}</div>`,
                    position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
                    fitbounds: true
                });

                const marker = new window.mappls.Marker({
                    position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
                    map: map,
                    icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" stroke="none" /><rect x="2.5" y="4.5" width="19" height="15" rx="1.5" ry="1.5" fill="none" /></svg>',
                        scaledSize: new window.mappls.Size(40, 40)
                    }
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });

                return marker;
            });

            setMarkers(newMarkers);
        };

        const script = document.createElement('script');
        script.src = "https://apis.mappls.com/advancedmaps/api/58fd6b7f21a95db2a0c1116eed9e8984/map_sdk?layer=vector&v=3.0&callback=initMap";
        script.defer = true;
        script.async = true;
        script.onload = () => initMap();
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [map, markers, locations]); // Include map, markers, and locations in the dependency array

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <h1>Map Page</h1>
            <div id="map" style={{ width: '80%', height: '90vh', margin: '10%' }}></div>
        </div>
    );
}

export default MapPage;
