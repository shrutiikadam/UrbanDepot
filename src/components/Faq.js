import React, { useState } from 'react';
import './FAQ.css'; // Create a CSS file for styling
import { FaQuestionCircle, FaChevronDown, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Add icons

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const faqs = [ // Define faqs first
        {
            question: "What is URBANDEPOT?",
            answer: "URBANDEPOT is your one-stop solution for finding and booking parking spaces in urban areas. We connect you with nearby parking spots through our website, ensuring convenience and peace of mind."
        },
        {
            question: "How does URBANDEPOT work?",
            answer: "Simply visit our website, search for available parking spaces near your location, and reserve your spot in advance. Our intuitive interface makes it easy to navigate and find the perfect parking space."
        },
        {
            question: "Is there a fee for using URBANDEPOT?",
            answer: "Yes, we utilize a platform fee structure: the fee is ₹30 per hour for cars and ₹15 per hour for bikes/scooters. This fee helps us maintain and improve our service for all users."
        },
        {
            question: "How can I contact customer support?",
            answer: "If you need assistance, you can reach our customer support team via the 'Contact Us' section on our website or by emailing us at support@urbandepot.com. We're here to help!"
        },
        {
            question: "Can I cancel my reservation?",
            answer: "Yes, you can cancel your reservation through our website. Please check our cancellation policy for any potential fees associated with cancellations."
        },
        {
            question: "Are there any discounts available?",
            answer: "We offer seasonal promotions and discounts for first-time users. Be sure to subscribe to our newsletter for updates on current offers and exclusive deals."
        },
        {
            question: "How can I provide feedback?",
            answer: "We value your input! You can provide feedback directly through our website in the 'Feedback' section, or you can email us at feedback@urbandepot.com."
        }
    ];

    const [feedback, setFeedback] = useState(faqs.map(() => ({ up: 0, down: 0 }))); // Now that faqs is defined, this works

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleFeedback = (index, type) => {
        const newFeedback = [...feedback];
        if (type === 'up') {
            newFeedback[index].up += 1; // Increment upvote
        } else {
            newFeedback[index].down += 1; // Increment downvote
        }
        setFeedback(newFeedback);
    };

    return (
        <div className="faq-container">
            <header>
                <h1>FAQ - Frequently Asked Questions</h1>
                <p>Your questions, answered!</p>
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="faq-search"
                />
            </header>
            <section>
                {filteredFAQs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <h3 className="faq-question" onClick={() => toggleAnswer(index)}>
                            <FaQuestionCircle className="faq-icon" />
                            <span>{faq.question}</span>
                            <FaChevronDown className={`arrow ${activeIndex === index ? 'active' : ''}`} />
                        </h3>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                                <div className="faq-feedback">
                                    <button onClick={() => handleFeedback(index, 'up')}>
                                        <FaThumbsUp /> {feedback[index].up}
                                    </button>
                                    <button onClick={() => handleFeedback(index, 'down')}>
                                        <FaThumbsDown /> {feedback[index].down}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </section>
            <footer>
                <p>Still have questions? <a href="/contact">Contact Us</a></p>
            </footer>
        </div>
    );
};

export default FAQ;
