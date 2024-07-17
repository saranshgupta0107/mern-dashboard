// // src/pages/MapPage.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function MapPage() {
//     const [locations, setLocations] = useState([]);

//     useEffect(() => {
//         const fetchLocations = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5500/api/locations');
//                 console.log('Fetched locations:', response.data); // Print the received data to the console
//                 setLocations(response.data);
//             } catch (error) {
//                 console.error('Error fetching locations', error);
//             }
//         };

//         fetchLocations();
//     }, []);

//     useEffect(() => {
//         const initMap = () => {
//             const mappls = window.mappls;
//             const map = new mappls.Map('map', {
//                 center: [28.61, 77.23],
//                 zoomControl: true,
//                 location: true,
//                 zoom: 5
//             });

//             locations.forEach(location => {
//                 const infowindow = new mappls.InfoWindow({
//                     map: map,
//                     content: `<div style="background-color: white; border: 1px solid black; padding: 5px; color: red;">${location.city}</div>`,
//                     position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
//                     fitbounds: true
//                 });

//                 const marker = new mappls.Marker({
//                     map: map,
//                     position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
//                     icon: {
//                         url: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" stroke="none" /><rect x="2.5" y="4.5" width="19" height="15" rx="1.5" ry="1.5" fill="none" /></svg>',
//                         scaledSize: { width: 40, height: 40 }
//                     }
//                 });

//                 marker.addListener('click', function() {
//                     infowindow.open(map, marker);
//                 });
//             });
//         };

//         const script = document.createElement('script');
//         script.src = "https://apis.mappls.com/advancedmaps/api/58fd6b7f21a95db2a0c1116eed9e8984/map_sdk?layer=vector&v=3.0&callback=initMap";
//         script.defer = true;
//         script.async = true;
//         script.onload = () => initMap();
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, [locations]);

//     return (
//         <div style={{ width: '100%', height: '100vh' }}>
//             <h1>Map Page</h1>
//             <div id="map" style={{ width: '80%', height: '90vh', margin: '10%' }}></div>
//         </div>
//     );
// }

// export default MapPage;






// src/pages/MapPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const initMap = () => {
            const mappls = window.mappls;
            const map = new mappls.Map('map', {
                center: [28.61, 77.23],
                zoomControl: true,
                location: true,
                zoom: 5
            });

            locations.forEach(location => {
                const infowindow = new mappls.InfoWindow({
                    content: `<div style="background-color: white; border: 1px solid black; padding: 5px; color: red; cursor: pointer;">${location.city}</div>`,
                    position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
                    fitbounds: true
                });

                const marker = new mappls.Marker({
                    map: map,
                    position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
                    icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" stroke="none" /><rect x="2.5" y="4.5" width="19" height="15" rx="1.5" ry="1.5" fill="none" /></svg>',
                        scaledSize: { width: 40, height: 40 }
                    }
                });

                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                    fetchCityData(location.city);
                });
            });
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
    }, [locations]);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <h1>Map Page</h1>
            <div id="map" style={{ width: '80%', height: '90vh', margin: '10%' }}></div>
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

