import React from 'react';
import './HeroPart.css';

// Insert video into the webpage
const HeroPart = () => {
  return (
    <div className="hero-container">
      <video src="https://chefshelf.s3.amazonaws.com/Food/video2.mp4" autoPlay loop muted />
    </div>
  )
}

export default HeroPart;
