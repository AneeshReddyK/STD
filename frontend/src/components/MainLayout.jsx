import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Accordion from './Accordion'; // Adjust the import path as necessary
import '../../src/styles/MainLayout.css'; // Import the CSS file


const MainLayout = ({children}) => {
  const accordionItems = [
    { title: 'StudentsForm', link: '/studentsForm' },
    { title: 'Results', link: '/Viewresults' },
    { title: 'Pass', link: '/Pass' },
    { title: 'Fail', link: '/Fail' },
    { title: 'Graph', link: '/Graph' }
  ];

  return (
    <div className="main-layout">
      <div className="accordion-container">
        <Accordion items={accordionItems} />
      </div>
      <div className="content-container">
        <Outlet /> {/* This will render the nested routes' content */}
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
