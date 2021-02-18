import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
const index = () => {
    return (
        <div className="linkingtolink">
            <p>Your Phone Number not verified! Please Verify to order!</p>
            <Link to="/link">Verify</Link>
        </div>
    );
};

export default index;
