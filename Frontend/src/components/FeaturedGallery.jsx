import { motion } from 'framer-motion';

const FeaturedGallery = () => {
    // Select specific portraits for the bento grid
    const images = {
        img1: '/assets/portfolio_wedding_1777618132221.png',
        img2: '/assets/portfolio_party_1777618183108.png',
        img3: '/assets/portrait_1.png',
        img4: '/assets/portfolio_birthday_1777618252010.png',
        img5: '/assets/Gemini_Generated_Image_ls2h9dls2h9dls2h.png',
        bg1: '/assets/portrait_2.png',
        bg2: '/assets/portfolio_commercial_1777618337873.png',
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
                <h2 className="font-serif bento-title">Gallery</h2>
            </motion.div>

            <div className="bento-grid-container">
                {/* Column 1 */}
                <motion.div className="bento-col col-1" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                    <div className="bento-item image-card tall">
                        <img src={images.img1} alt="Wedding" />
                        <div className="bento-overlay">
                            <h3>Eternal<br />Wedding Stories</h3>
                        </div>
                    </div>
                    <div className="bento-item color-card bg-ref-green" style={{ backgroundImage: `url(${images.bg1})` }}>
                        <div className="color-card-overlay">
                            <h3 className="stat-large">100+</h3>
                            <p>Weddings captured with elegance and grace.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Column 2 */}
                <motion.div className="bento-col col-2" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <div className="bento-item image-card full">
                        <img src={images.img2} alt="Party" />
                        <div className="bento-overlay">
                            <h3>Vibrant Party & Event Coverage</h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="bento-col col-3" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                    <div className="bento-item image-card full">
                        <img src={images.img5} alt="Party" />

                        <div className="color-card-overlay centered">
                            <a href="#contact" className="btn mt-4">Book a Session</a>
                        </div>
                    </div>
                </motion.div>

                {/* Column 4 */}
                <motion.div className="bento-col col-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                    <div className="bento-item image-card tall">
                        <img src={images.img3} alt="Baby" />
                        <div className="bento-overlay">
                            <h3>Newborn<br />Wonders</h3>
                        </div>
                    </div>
                    <div className="bento-item image-card short">
                        <img src={images.img4} alt="Birthday" />
                        <div className="bento-overlay">
                            <h3>Birthday<br />Milestones</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Column 5 */}
                <motion.div className="bento-col col-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
                    <div className="bento-item color-card bg-ref-darkgreen full relative-content" style={{ backgroundImage: `url(${images.bg3})` }}>
                        <div className="color-card-overlay">
                            <h3 className="spaced-text">
                                <span className="large-serif gold-text">ONE</span>
                                <span className="sub-text">family,</span>
                                <br />
                                <span className="sub-text">Memory</span>
                                <br />
                                <span className="sub-text">Book</span>
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
