import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { heroImages } from '../data/portfolioData';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(Math.floor(heroImages.length / 2));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <h1>Capturing Timeless Moments</h1>
            </div>

            <div className="hero-carousel-container">
                <button className="carousel-nav-btn prev-btn" onClick={() => setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}>
                    &#10094;
                </button>

                <div className="hero-carousel">
                    {heroImages.map((src, index) => {
                        let offset = index - currentIndex;

                        // Handle wrap around for smooth infinite feel
                        if (offset < -Math.floor(heroImages.length / 2)) {
                            offset += heroImages.length;
                        }
                        if (offset > Math.floor(heroImages.length / 2)) {
                            offset -= heroImages.length;
                        }

                        const isCenter = offset === 0;
                        const sign = Math.sign(offset);
                        const absOffset = Math.abs(offset);

                        // 3D Math properties
                        const zTranslate = isCenter ? 0 : -Math.abs(offset) * 150;
                        // Increased xTranslate from 160 to 220 to add more space on the sides
                        const xTranslate = offset * 220;
                        const rotateY = isCenter ? 0 : -sign * 35; // 35 degrees tilt

                        const handleDragEnd = (event, info) => {
                            const swipeThreshold = 50;
                            if (info.offset.x > swipeThreshold) {
                                // swiped right
                                setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
                            } else if (info.offset.x < -swipeThreshold) {
                                // swiped left
                                setCurrentIndex((prev) => (prev + 1) % heroImages.length);
                            }
                        };

                        return (
                            <motion.div
                                key={src}
                                className={`hero-card ${isCenter ? 'active' : ''}`}
                                animate={{
                                    x: xTranslate,
                                    z: zTranslate,
                                    rotateY: rotateY,
                                    scale: isCenter ? 1 : 1 - (absOffset * 0.1),
                                    opacity: absOffset > 2 ? 0 : 1, // Only show 5 items max
                                    zIndex: heroImages.length - absOffset,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut"
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img src={src} alt={`Hero ${index + 1}`} />
                                <div className="card-glare"></div>
                            </motion.div>
                        );
                    })}
                </div>

                <button className="carousel-nav-btn next-btn" onClick={() => setCurrentIndex((prev) => (prev + 1) % heroImages.length)}>
                    &#10095;
                </button>
            </div>
        </section>
    );
};

export default Hero;
