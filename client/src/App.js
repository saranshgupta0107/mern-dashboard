// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HelloPage from './pages/HelloPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // Import HomePage

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Update default route to HomePage */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/hello" element={<HelloPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
