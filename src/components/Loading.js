// src/components/Loading.js

import React from 'react';
import './Loading.css'; // Import the CSS file for styling
import urbanLogo from './images/urbanlogo1.png'; // Adjust the path if necessary

const Loading = () => {
    return (
        <div className="loading-indicator">
            <div className="logo-animation">
                <img src={urbanLogo} alt="Loading Urban Depot logo" className="loading-logo" />
            </div>
        </div>
    );
};

export default Loading;
