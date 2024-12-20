import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Typed from 'typed.js';

const LandingPage = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const el = useRef(null);
  const mainContainerRef = useRef(null); // Create a ref for the main container

  useEffect(() => {
    const options = {
      strings: ["Roaming endlessly to find parking?!"],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    };

    const typed = new Typed(el.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      setFadeOut(true);
      setTimeout(() => navigate('/home'), 1200); // Match this timeout to the animation duration
    }
  }, [navigate]);

  useEffect(() => {
    // Attach keydown event listener
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleContainerClick = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.focus(); // Refocus the main container on click
      console.log("Container clicked and focused."); // Log focus action
    }
  };

  const handleIframeClick = (event) => {
    event.preventDefault(); // Prevent the iframe from capturing focus
    if (mainContainerRef.current) {
      mainContainerRef.current.focus(); // Refocus the main container
      console.log("Iframe clicked; refocusing container."); // Log action
    }
  };

  return (
    <div
      className={`main ${fadeOut ? 'fade-out' : ''}`}
      onClick={handleContainerClick} // Handle click to refocus
      ref={mainContainerRef} // Attach the ref to the main container
      tabIndex="0" // Allow the div to be focusable
      style={{ width: '100vw', height: '100vh', position: 'relative' }} // Make it cover the viewport
    >
      <div className="overlay-text">
        <h1 ref={el}></h1> {/* Using ref for typing effect */}
      </div>
      <div className="background-iframe" style={{ width: '100%', height: '100%' }}>
        <iframe
          src="https://my.spline.design/travellinginfinitecopycopycopycopy-825b5dec4e3080b4bea5ff4974857513/"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Spline 3D Scene"
          onMouseDown={handleIframeClick} // Handle mouse down on iframe
        ></iframe>
      </div>
    </div>
  );
};

export default LandingPage;
