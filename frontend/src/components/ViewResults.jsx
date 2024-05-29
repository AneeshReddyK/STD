import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/ViewResults.css';
import MainLayout from './MainLayout';
import { GoBackButton } from './Logout';

const ViewResults = () => {
    const [hallticketNo, setHallticketNo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const buttonPosition = {
        top: '535px',
        left: '740px',
    };

    const handleViewResults = () => {
        if (hallticketNo.trim() === '') {
            setErrorMessage('Please enter a hall ticket number.');
        } else {
            // Reset error message if there was one
            setErrorMessage('');

            // Proceed to navigate to ResultsPage with hallticketNo as parameter
            navigate(`/ResultsPage/${hallticketNo}`);
        }
    };

    return (
        <MainLayout>
            <div className="view-results-wrapper">
                <div className="view-results-container">
                    <h2>View Results</h2>
                    <input
                        type="text"
                        placeholder="Enter Hall Ticket Number"
                        value={hallticketNo}
                        onChange={(e) => setHallticketNo(e.target.value)}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button onClick={handleViewResults}>View Results</button>
                </div>
                <GoBackButton position={buttonPosition} />
            </div>
        </MainLayout>
    );
};

export default ViewResults;
