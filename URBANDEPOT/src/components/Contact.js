import React, { useState } from 'react';
import './Contact.css'; // Import the CSS for styling
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission goes here
        setSubmitted(true);
        toast.success('Thank you! Your message has been sent.');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-container">
            <header>
                <h1>Get in Touch!</h1>
                <p>We’d love to hear from you. Reach out to us anytime!</p>
            </header>
            <div className="contact-details">
                <div className="detail">
                    <FaMapMarkerAlt className="icon location-icon" />
                    <h2>Our Location</h2>
                    <p>Heritage Towers, BKC</p>
                </div>
                <div className="detail">
                    <FaPhone className="icon phone-icon" />
                    <h2>Phone Number</h2>
                    <p>+1 8828174914</p>
                </div>
                <div className="detail" onClick={() => window.location.href = 'mailto:urbandepot2024@gmail.com'}>
                    <FaEnvelope className="icon email-icon" />
                    <h2>Email Us</h2>
                    <p>urbandepot2024@gmail.com</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send us a message</h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Send Message</button>
            </form>
            {submitted && <p className="success-message">Thank you! Your message has been sent.</p>}
            <ToastContainer />
        </div>
    );
};

export default Contact;
