import { motion } from 'framer-motion';

const ServiceCard = ({ service, index }) => {
    return (
        <motion.div
            className="character-card-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className="character-card">
                {/* Character Image popping out */}
                <div className="character-image-container">
                    <img src={service.image} alt={service.name} className="character-image" />
                </div>

                {/* Colored background block */}
                <div className="character-card-bg" style={{ background: service.color }}>
                    <div className="character-info">
                        <h3>{service.name}</h3>
                        <p><strong>{service.desc}</strong></p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Services = () => {
    const services = [
        {
            name: "Wedding",
            desc: "Editorial Stories",
            color: "linear-gradient(135deg, #e52d4c, #b60a2b)",
            image: "/assets/tanrica-ai-generated-9519468.png"
        },
        {
            name: "Birthday",
            desc: "Special Milestones",
            color: "linear-gradient(135deg, #185aab, #0f3669)",
            image: "/assets/semja-ai-generated-7840987.png"
        },
        {
            name: "Party",
            desc: "Vibrant Celebrations",
            color: "linear-gradient(135deg, #408140, #225122)",
            image: "/assets/lucianavieira-businessman-6718509.png"
        },
        {
            name: "Baby",
            desc: "New Beginnings",
            color: "linear-gradient(135deg, #202b4d, #11172a)",
            image: "/assets/thehappygraphics-fairy-8065764.png"
        }
    ];

    return (
        <section id="services" className="characters-section">
            <div className="section-header">
                <span className="subtitle">Curated Experiences</span>
                <h2 className="title">Our Services</h2>
                <div className="header-line"></div>
            </div>
            <div className="characters-grid">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Services;
