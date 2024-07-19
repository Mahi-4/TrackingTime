import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../component.css';
import '../assets/BackImg3.png';


const Onboard2 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/onboard3');
  };

  return (
    <div className="container">
      <div className="background" style={{ backgroundImage: `url(${require('../assets/BackImg2.png')})` }}>
        <div className="overlay">
          <h2>We serve incomparable delicacies</h2>
          <p>All the best restaurants with their top menu waiting for you, they can't wait for your order!!</p>
          <div className="pagination-dots">
            <span className="dot"></span>
            <span className="dot active"></span>
            <span className="dot"></span>
          </div>
          <div className="navigation-buttons">
            <button className="skip-button" onClick={() => navigate('/screen3')}>Skip</button>
            <button className="next-button" onClick={handleNext}>Next ➔</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard2;
