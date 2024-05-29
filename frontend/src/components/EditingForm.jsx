import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import '../../src/styles/EditingForm.css'
import MainLayout from './MainLayout';

const EditingComponent = ({ setIsEditing, studentData }) => {
  const [stdname, setStdname] = useState(studentData.stdname);
  const [hallticketNo, setHallticketNo] = useState(studentData.hallticketNo);
  const [englishMarks, setEnglishMarks] = useState(studentData.englishMarks);
  const [javaMarks, setJavaMarks] = useState(studentData.javaMarks);
  const [pythonMarks, setPythonMarks] = useState(studentData.pythonMarks);
  const [cppMarks, setCppMarks] = useState(studentData.cppMarks);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/student/studentform/${hallticketNo}`, {
        stdname,
        englishMarks,
        javaMarks,
        pythonMarks,
        cppMarks
      });
      console.log('Edit successful:', response.data);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error editing form:', error);
      // Handle error
    }
  };

  return (
    <MainLayout>
    <form className="form" onSubmit={handleEditSubmit}>
      <div className="input-wrapper">
        <label htmlFor="stdname">Student Name:</label>
        <input
          type="text"
          id="stdname"
          value={stdname}
          onChange={(e) => setStdname(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="hallticketNo">Hall Ticket Number:</label>
        <input
          type="text"
          id="hallticketNo"
          value={hallticketNo}
          onChange={(e) => setHallticketNo(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="englishMarks">English Marks:</label>
        <input
          type="number"
          id="englishMarks"
          value={englishMarks}
          onChange={(e) => setEnglishMarks(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="javaMarks">Java Marks:</label>
        <input
          type="number"
          id="javaMarks"
          value={javaMarks}
          onChange={(e) => setJavaMarks(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="pythonMarks">Python Marks:</label>
        <input
          type="number"
          id="pythonMarks"
          value={pythonMarks}
          onChange={(e) => setPythonMarks(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="cppMarks">C++ Marks:</label>
        <input
          type="number"
          id="cppMarks"
          value={cppMarks}
          onChange={(e) => setCppMarks(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update</button>
      <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
    </MainLayout>
  );
  
};

export default EditingComponent;
