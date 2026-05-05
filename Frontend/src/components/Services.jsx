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
            title: "Artistic Portraits",
            desc: "Deeply personal and artistic portraits that reveal the true character and soul of the subject.",
            image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                    <line x1="16" y1="8" x2="2" y2="22" />
                    <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
            )
        },
        {
            title: "Luxury Commercial",
            desc: "High-end visual content for brands that value aesthetic excellence and narrative power.",
            image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
