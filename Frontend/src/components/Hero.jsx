import React, { useState, useEffect } from 'react';
import { heroImages } from '../data/portfolioData';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="hero">
            <div className="hero-bg">
                {heroImages.map((src, index) => (
                    <img
                        key={src}
                        src={src}
                        alt={`Hero Background ${index + 1}`}
                        className={index === currentIndex ? 'active' : ''}
                    />
                ))}
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <p>Fine Art & Editorial Photography</p>
                <h1>Capturing Timeless Moments</h1>
                <div style={{ marginTop: '2rem' }}>
                    <a href="#portfolio" className="btn">View Portfolio</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
