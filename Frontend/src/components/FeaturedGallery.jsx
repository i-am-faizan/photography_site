import { motion } from 'framer-motion';

const FeaturedGallery = () => {
    const portraits = [
        { id: 1, src: '/assets/portrait_1.png', delay: 0.1 },
        { id: 2, src: '/assets/portrait_2.png', delay: 0.2 },
        { id: 3, src: '/assets/portrait_3.png', delay: 0.3 },
        { id: 4, src: '/assets/portrait_4.png', delay: 0.4 },
        { id: 5, src: '/assets/portrait_5.png', delay: 0.5 },
        { id: 6, src: '/assets/portrait_6.png', delay: 0.6 },
        { id: 7, src: '/assets/portrait_7.png', delay: 0.7 },
        { id: 8, src: '/assets/portrait_8.png', delay: 0.8 },
        { id: 9, src: '/assets/portfolio_wedding_1777618132221.png', delay: 0.9 },
        { id: 10, src: '/assets/portfolio_party_1777618183108.png', delay: 1.0 },
        { id: 11, src: '/assets/portfolio_commercial_1777618337873.png', delay: 1.1 },
        { id: 12, src: '/assets/portfolio_birthday_1777618252010.png', delay: 1.2 },
    ];

    return (
        <section className="featured-gallery">
            <div className="gallery-background-grid">
                {portraits.map((portrait) => (
                    <motion.div
                        key={portrait.id}
                        className={`floating-portrait portrait-${portrait.id}`}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: {
                                duration: 0.8,
                                delay: portrait.delay,
                                ease: [0.2, 0.65, 0.3, 0.9]
                            }
                        }}
                        viewport={{ once: true }}
                        animate={{
                            y: [0, -15, 0],
                            transition: {
                                duration: 4 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        <img src={portrait.src} alt={`Portrait ${portrait.id}`} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="gallery-center-content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, delay: 0.2 }
                }}
                viewport={{ once: true }}
            >
                <h2>
                    <span className="title-primary">We are family.</span>
                    <span className="title-secondary">Save your stories with us</span>
                </h2>
                <p>Learn why families trust our lens to capture their most precious moments and tell their unique stories.</p>
                <a href="#contact" className="gallery-cta">
                    Start Your Story
                </a>
            </motion.div>
        </section>
    );
};

export default FeaturedGallery;
