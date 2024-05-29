import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MainLayout from './MainLayout';
import '../../src/styles/Results.css'; // Adjusted import path

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/student/Results');
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MainLayout>
      <div className="table-container">
        <h2>Results</h2>
        <table className="results-table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Hall Ticket No</th>
              <th>Student Name</th>
              <th>Total Marks</th>
              <th>Result</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => ( // Removed unnecessary check for array
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.hallticketNo}</td>
                <td>{result.stdname}</td>
                <td>{result.totalMarks}</td>
                <td>{result.result}</td>
                <td>
                  <Link to={`/viewresults`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Results;
