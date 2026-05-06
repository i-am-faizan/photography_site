import { motion, useMotionValue, useTransform } from 'framer-motion';

const ServiceCard = ({ service, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Parallax values for the 2.5D effect
    const avatarX = useTransform(x, [-200, 200], [-15, 15]);
    const avatarY = useTransform(y, [-200, 200], [-15, 15]);
    
    const bgX = useTransform(x, [-200, 200], [5, -5]);
    const bgY = useTransform(y, [-200, 200], [5, -5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="service-card-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="service-card">
                <div className="service-card-border"></div>

                {/* Layer A: Background / Card Body */}
                <motion.div className="service-card-bg" style={{ x: bgX, y: bgY }}>
                    <div className="card-texture"></div>
                    <div className="burning-overlay" style={{ backgroundImage: `url(${service.image})` }}></div>
                </motion.div>

                {/* Layer B: Frosted Glass Panel */}
                <div className="glass-panel"></div>

                {/* Layer C: Avatar Stack with Masking */}
                <div className="avatar-parallax-container">
                    <motion.div 
                        className="avatar-wrapper"
                        style={{ x: avatarX, y: avatarY }}
                    >
                        <div className="avatar-shadow"></div>
                        <img src={service.image} alt={service.title} className="avatar-img" />
                        <div className="avatar-badge">
                            {service.icon}
                        </div>
                    </motion.div>
                </div>

                <div className="service-content">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                    <div className="service-footer">
                        <span className="explore-btn">Discover More</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    const services = [
        {
            title: "Wedding Stories",
            desc: "Capturing the raw emotion and intricate details of your special day with an editorial eye.",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    <path d="M12 12c.5-1.5 2-2.5 3.5-2.5 1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5c-1.5 0-3-1-3.5-2.5z" />
                    <path d="M12 12c-.5-1.5-2-2.5-3.5-2.5-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5c1.5 0 3-1 3.5-2.5z" />
                </svg>
            )
        },
        {
            title: "Party",
            desc: "Vibrant and energetic photography capturing the joy, movement, and unforgettable moments of your celebrations.",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
            )
        },
        {
            title: "Birthday",
            desc: "Beautifully documented birthday milestones, preserving the laughter, love, and special memories with family and friends.",
            image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=800&q=80",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
                    <polyline points="20 12 20 22 4 22 4 12"></polyline>
                    <rect x="2" y="7" width="20" height="5"></rect>
                    <line x1="12" y1="22" x2="12" y2="7"></line>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                </svg>
            )
        }
    ];

    return (
        <section id="services">
            <div className="section-header">
                <span className="subtitle">Curated Experiences</span>
                <h2 className="title">Our Services</h2>
                <div className="header-line"></div>
            </div>
            <div className="services-grid">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Services;
