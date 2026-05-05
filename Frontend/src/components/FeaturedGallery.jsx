import { motion } from 'framer-motion';

const FeaturedGallery = () => {
    // Select specific portraits for the bento grid
    const images = {
        img1: '/assets/portrait_1.png',
        img2: '/assets/portrait_3.png',
        img3: '/assets/portrait_5.png',
        img4: '/assets/portrait_6.png',
        bg1: '/assets/portrait_2.png',
        bg2: '/assets/portfolio_wedding_1777618132221.png',
        bg3: '/assets/portrait_8.png',
    };

    return (
        <section className="featured-gallery bento-section">
            <motion.div 
                className="bento-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="font-serif bento-title">
                    Capture the moments that matter - <br />
                    Save your family stories
                </h2>
                <p className="bento-subtitle">Our photography provides the artistry and care needed to preserve your family's legacy. Together, we can ensure every beautiful moment is captured and cherished!</p>
            </motion.div>

            <div className="bento-grid-container">
                {/* Column 1 */}
                <motion.div className="bento-col col-1" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                    <div className="bento-item image-card tall">
                        <img src={images.img1} alt="Smiles" />
                        <div className="bento-overlay">
                            <h3>Be the reason<br/>they smile</h3>
                        </div>
                    </div>
                    <div className="bento-item color-card bg-ref-green" style={{ backgroundImage: `url(${images.bg1})` }}>
                        <div className="color-card-overlay">
                            <h3 className="stat-large">85 %</h3>
                            <p>increase in cherished memories preserved forever.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Column 2 */}
                <motion.div className="bento-col col-2" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <div className="bento-item image-card full">
                        <img src={images.img2} alt="Experience" />
                        <div className="bento-overlay">
                            <h3>200+ Photoshoots empowering families everyday.</h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="bento-col col-3" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                    <div className="bento-item color-card bg-ref-purple centered-content full" style={{ backgroundImage: `url(${images.bg2})` }}>
                        <div className="color-card-overlay centered">
                            <h3>Join 1000 people building a beautiful legacy.</h3>
                            <a href="#contact" className="solid-btn mt-4">Book a Session</a>
                        </div>
                    </div>
                </motion.div>

                {/* Column 4 */}
                <motion.div className="bento-col col-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                    <div className="bento-item image-card tall">
                        <img src={images.img3} alt="Inspire" />
                        <div className="bento-overlay">
                            <h3>Inspire joy,<br/>Inspire connection</h3>
                        </div>
                    </div>
                    <div className="bento-item image-card short">
                        <img src={images.img4} alt="Gift" />
                        <div className="bento-overlay">
                            <h3>Give the gift<br/>of memories</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Column 5 */}
                <motion.div className="bento-col col-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
                    <div className="bento-item color-card bg-ref-darkgreen full relative-content" style={{ backgroundImage: `url(${images.bg3})` }}>
                        <div className="color-card-overlay">
                            <h3 className="spaced-text">
                                <span className="large-serif text-white">ONE</span>
                                <span className="sub-text text-white" style={{ opacity: 0.8 }}>family,</span>
                                <br/>
                                <span className="sub-text text-white" style={{ opacity: 0.8 }}>Memory</span>
                                <br/>
                                <span className="sub-text text-white" style={{ opacity: 0.8 }}>Book</span>
                            </h3>
                            <svg className="squiggly-line" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10,20 Q30,80 50,40 T90,80" stroke="#72e59e" strokeWidth="3" strokeLinecap="round" fill="none" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedGallery;
