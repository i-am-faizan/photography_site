import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "../lib/contentUtils";

const Hero = ({ hero }) => {
  const heroImages = hero?.images || [];
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.max(heroImages.length, 1) / 2));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLargeScreen(window.innerWidth > 1600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!heroImages.length) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>{hero?.heading}</h1>
        {hero?.subheading ? <p className="hero-subheading">{hero.subheading}</p> : null}
      </div>

      <div className="hero-carousel-container">
        <button
          className="carousel-nav-btn prev-btn"
          onClick={() => setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
        >
          &#10094;
        </button>

        <div className="hero-carousel">
          {heroImages.map((image, index) => {
            let offset = index - currentIndex;

            if (offset < -Math.floor(heroImages.length / 2)) {
              offset += heroImages.length;
            }
            if (offset > Math.floor(heroImages.length / 2)) {
              offset -= heroImages.length;
            }

            const isCenter = offset === 0;
            const sign = Math.sign(offset);
            const absOffset = Math.abs(offset);
            const zTranslate = isCenter ? 0 : -absOffset * (isMobile ? 100 : isLargeScreen ? 200 : 150);

            let xMultiplier = 220;
            if (isMobile) {
              xMultiplier = 120;
            } else if (isLargeScreen) {
              xMultiplier = window.innerWidth > 2000 ? 400 : 320;
            }

            const xTranslate = offset * xMultiplier;
            const rotateY = isCenter ? 0 : -sign * (isMobile ? 25 : 35);

            const handleDragEnd = (_event, info) => {
              const swipeThreshold = 50;
              if (info.offset.x > swipeThreshold) {
                setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
              } else if (info.offset.x < -swipeThreshold) {
                setCurrentIndex((prev) => (prev + 1) % heroImages.length);
              }
            };

            return (
              <motion.div
                key={image.url || index}
                className={`hero-card ${isCenter ? "active" : ""}`}
                animate={{
                  x: xTranslate,
                  z: zTranslate,
                  rotateY,
                  scale: isCenter ? 1 : 1 - absOffset * 0.1,
                  opacity: absOffset > 2 ? 0 : 1,
                  zIndex: heroImages.length - absOffset
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
                <img src={getImageUrl(image)} alt={image.alt || `Hero ${index + 1}`} />
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
