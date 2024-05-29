import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/Accordion.css'; // Import the CSS file

const Accordion = ({ items }) => {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <Link to={item.link} className="accordion-title">
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
