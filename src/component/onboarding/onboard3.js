import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/BackImg3.png';
import '../component.css';

const Onboard3 = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="background" style={{ backgroundImage: `url(${require('../assets/BackImg3.png')})` }}>
        <div className="overlay">
          <h2>We serve incomparable delicacies</h2>
          <p>All the best restaurants with their top menu waiting for you, they can't wait for your order!!</p>
          <div className="pagination">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot active"></span>
          </div>
          <div className="navigation-arrow">
            <button className='arrow-button' onClick={() => navigate('/login')}>➔</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard3;
