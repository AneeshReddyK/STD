import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../src/styles/ResultsPage.css';
import MainLayout from './MainLayout';
import { GoBackButton } from './Logout';

const ResultPage = () => {
    const { hallTicketNo } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    
    const buttonPosition = {
        top: '550px',
        left: '740px',
    };

    useEffect(() => {
        const fetchResult = async () => {
            console.log('fjsdfjl')
            try {
                const response = await axios.get(`http://localhost:3001/student/ResultsPage/${hallTicketNo}`);
                setResult(response.data);
                setError('');
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError('Result not found');
                } else {
                    setError('An error occurred while fetching the result');
                }
                setResult(null);
            }
        };

        fetchResult();
    }, [hallTicketNo]);

    return (
        <MainLayout>
            <div className="result-page-container">
                <h2>Result Details</h2>
                {error && <p>{error}</p>}
                {result && (
                    <div className="result-box">
                        <div className="result-details">
                            <p><strong>Hall Ticket Number:</strong> {result.hallticketNo}</p>
                            <p><strong>Name:</strong> {result.stdname}</p>
                            <p><strong>English Marks:</strong> {result.english}</p>
                            <p><strong>Java Marks:</strong> {result.java}</p>
                            <p><strong>Python Marks:</strong> {result.python}</p>
                            <p><strong>C++ Marks:</strong> {result.cpp}</p>
                            <p><strong>Total Marks:</strong> {result.totalMarks}</p>
                            <p><strong>Grade:</strong> {result.result}</p>
                        </div>
                    </div>
                )}
                <GoBackButton  position={buttonPosition} />
            </div>
            
        </MainLayout>

    );
};

export default ResultPage;