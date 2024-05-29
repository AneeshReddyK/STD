import React, { useState } from 'react';
import axios from 'axios';
import '../../src/styles/StudentForm.css'; // Import the CSS file with the styles
import { FaEdit } from 'react-icons/fa'; // Import the edit icon from react-icons library
import MainLayout from './MainLayout';

const StudentForm = () => {
  const [stdname, setStdname] = useState('');
  const [hallticketNo, setHallticketNo] = useState('');
  const [englishMarks, setEnglishMarks] = useState('');
  const [javaMarks, setJavaMarks] = useState('');
  const [pythonMarks, setPythonMarks] = useState('');
  const [cppMarks, setCppMarks] = useState('');
  const [error, setError] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmissionError('');

    if (!stdname || !hallticketNo || !englishMarks || !javaMarks || !pythonMarks || !cppMarks) {
      setError('Please fill in all fields.');
      return;
    }

    const englishMarksInt = parseInt(englishMarks, 10);
    const javaMarksInt = parseInt(javaMarks, 10);
    const pythonMarksInt = parseInt(pythonMarks, 10);
    const cppMarksInt = parseInt(cppMarks, 10);

    const result = englishMarksInt >= 35 && javaMarksInt >= 35 && pythonMarksInt >= 35 && cppMarksInt >= 35 ? 'Pass' : 'Fail';

    try {
      const response = await axios.post('http://localhost:3001/student/studentform', {
        stdname,
        hallticketNo,
        english: englishMarksInt,
        java: javaMarksInt,
        python: pythonMarksInt,
        cpp: cppMarksInt
      });
      console.log(response.data);
      setStdname('');
      setHallticketNo('');
      setEnglishMarks('');
      setJavaMarks('');
      setPythonMarks('');
      setCppMarks('');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === 'Hall ticket number already exists') {
        setSubmissionError('Hall ticket number already exists.');
      } else {
        setSubmissionError('Error submitting form. Please try again.');
      }
      console.error('Error submitting form:', error);
    }
  };

  return (
    <MainLayout>
      <div className="form-wrapper">
        <div className="form-container">
          <h2>Student Form</h2>
          {error && <p className="error">{error}</p>}
          {submissionError && <p className="error">{submissionError}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="stdname">Student Name:</label>
              <input
                type="text"
                id="stdname"
                value={stdname}
                onChange={(e) => setStdname(e.target.value)}
                required
              />
              <FaEdit className="edit-icon" />
            </div>
            <div>
              <label htmlFor="hallticketNo">Hall Ticket Number:</label>
              <input
                type="text"
                id="hallticketNo"
                value={hallticketNo}
                onChange={(e) => setHallticketNo(e.target.value)}
                required
              />
              <FaEdit className="edit-icon" />
            </div>
            <div>
              <label htmlFor="englishMarks">English Marks:</label>
              <input
                type="number"
                id="englishMarks"
                value={englishMarks}
                onChange={(e) => setEnglishMarks(e.target.value)}
                required
              />
              <FaEdit className="edit-icon" />
            </div>
            <div>
              <label htmlFor="javaMarks">Java Marks:</label>
              <input
                type="number"
                id="javaMarks"
                value={javaMarks}
                onChange={(e) => setJavaMarks(e.target.value)}
                required
              />
              <FaEdit className="edit-icon" />
            </div>
            <div>
              <label htmlFor="pythonMarks">Python Marks:</label>
              <input
                type="number"
                id="pythonMarks"
                value={pythonMarks}
                onChange={(e) => setPythonMarks(e.target.value)}
                required
              />
              <FaEdit className="edit-icon" />
            </div>
            <div>
              <label htmlFor="cppMarks">C++ Marks:</label>
              <input
                type="number"
                id="cppMarks"
                value={cppMarks}
                onChange={(e) => setCppMarks(e.target.value)}
                required
              />
              <FaEdit className="edit-icon" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentForm;
