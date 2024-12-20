import React, { useState, useEffect } from 'react';
import './TransitionSection.css';

const TransitionSection = () => {
  const [isVisible, setIsVisible] = useState(Array(4).fill(false)); // Update to 4

  const sectionClasses = [
    "section1",
    "section2",
    "section3",
    "section4", // Adjust to 4 classes
  ];

  const content = [
    {
      title12: "Effortless Parking in Three Simple Steps",
      description: [
        "Search – Enter your location, time, and date to find available spots nearby.",
        "Reserve – Choose your preferred parking spot and reserve it instantly.",
        "Park & Go – Arrive, park, and enjoy a stress-free experience with guaranteed parking!",
      ],
    },
    {
      title12: "Secure Payments",
      description: "Convenient online payments to streamline your experience.",
    },
    {
      title12: "Revolutionizing Urban Parking",
      description: "Parking doesn’t have to be a hassle. URBANDEPOT is committed to transforming how we park in busy cities.",
    },
    {
      title12: "Contact Us",
      description: "Find us at [contact information] or email us at support@urbandepot.com.",
    },
  ]; // Update to 4 content items

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll('.transition-section'));
      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
          setIsVisible(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <head><link href="https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" /></head>
      {Array.from({ length: 4 }, (_, index) => ( // Update to 4
        <div
          key={index}
          className={`transition-section ${isVisible[index] ? 'visible' : ''} ${sectionClasses[index]}`}
        >
          <div className="content">
            <h2>{content[index].title12}</h2>
            <p>{Array.isArray(content[index].description) ? content[index].description.join(" ") : content[index].description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TransitionSection;