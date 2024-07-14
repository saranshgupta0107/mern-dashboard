// src/pages/MapPage.js
import React, { useEffect } from 'react';

function MapPage() {
    useEffect(() => {
        const initMap = () => {
            const mappls = window.mappls; 
            const map = new mappls.Map('map', {
                center: [28.61, 77.23],
                zoomControl: true,
                location: true
            });
            new mappls.InfoWindow({
                map: map,
                content: "MapmyIndia",
                position: { lat: 28.61, lng: 77.23 },
                fitbounds: true
            });
        };

        const script = document.createElement('script');
        script.src = "https://apis.mappls.com/advancedmaps/api/<token>/map_sdk?layer=vector&v=3.0&callback=initMap";
        script.defer = true;
        script.async = true;
        script.onload = () => initMap();
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <h1>Map Page</h1>
            <div id="map" style={{ width: '100%', height: '90vh' }}></div>
        </div>
    );
}

export default MapPage;
