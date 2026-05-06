import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const characterImageLayoutTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.35
};

const ServiceCard = ({ service, index, onSelect }) => {
    return (
        <motion.div
            className="character-card-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => onSelect(service)}
        >
            <div className="character-card">
                {/* Character Image popping out */}
                <div className="character-image-container">
                    <motion.img
                        src={service.image}
                        alt={service.name}
                        className="character-image"
                        layoutId={`service-image-${service.name}`}
                        transition={characterImageLayoutTransition}
                    />
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
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            name: "Wedding",
            desc: "Editorial Stories",
            subtitle: "Cinematic vows and timeless storytelling",
            longDescription: "Our wedding coverage blends editorial direction with documentary honesty. We shape elegant portraits, preserve the atmosphere of the day, and capture fleeting emotional details so your full celebration feels immersive long after the event is over.",
            color: "linear-gradient(135deg, #e52d4c, #b60a2b)",
            panelColor: "linear-gradient(135deg, #b62543 0%, #86182f 100%)",
            image: "/assets/tanrica-ai-generated-9519468.png"
        },
        {
            name: "Birthday",
            desc: "Special Milestones",
            subtitle: "Joyful celebrations with a polished finish",
            longDescription: "Birthday sessions are designed to feel vibrant, personal, and effortless. From styled portraits to candid interactions, we create a visual record that highlights the energy of the celebration while still feeling refined and beautifully composed.",
            color: "linear-gradient(135deg, #185aab, #0f3669)",
            panelColor: "linear-gradient(135deg, #1b65c2 0%, #134791 100%)",
            image: "/assets/semja-ai-generated-7840987.png"
        },
        {
            name: "Commercial",
            desc: "Office Celebrations",
            subtitle: "Brand-focused imagery with human presence",
            longDescription: "Our commercial photography is built for brands that want clarity, polish, and emotion in the same frame. We combine purposeful art direction with clean production to deliver visuals that strengthen campaigns, websites, launches, and internal storytelling.",
            color: "linear-gradient(135deg, #408140, #225122)",
            panelColor: "linear-gradient(135deg, #4a9950 0%, #2b6d33 100%)",
            image: "/assets/lucianavieira-businessman-6718509.png"
        },
        {
            name: "Baby",
            desc: "New Beginnings",
            subtitle: "Soft, intimate moments for growing families",
            longDescription: "Baby sessions focus on tenderness, comfort, and natural connection. We use a calm pace and gentle styling to create images that feel warm and expressive, preserving the quiet beauty of early family memories without making the experience feel forced.",
            color: "linear-gradient(135deg, #202b4d, #11172a)",
            panelColor: "linear-gradient(135deg, #324678 0%, #1a2544 100%)",
            image: "/assets/thehappygraphics-fairy-8065764.png"
        }
    ];

    useEffect(() => {
        if (!selectedService) {
            document.body.style.overflow = '';
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSelectedService(null);
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedService]);

    return (
        <section id="services" className="characters-section">
            <div className="section-header">
                <span className="subtitle">Curated Experiences</span>
                <h2 className="title">Our Services</h2>
                <div className="header-line"></div>
            </div>
            <div className="characters-grid">
                {services.map((service, index) => (
                    <ServiceCard
                        key={service.name}
                        service={service}
                        index={index}
                        onSelect={setSelectedService}
                    />
                ))}
            </div>
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        className="service-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            className="service-modal"
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="service-modal-body">
                                <div className="service-modal-stage">
                                    <div className="service-modal-media">
                                        <motion.img
                                            src={selectedService.image}
                                            alt={selectedService.name}
                                            className="service-modal-image"
                                            layoutId={`service-image-${selectedService.name}`}
                                            transition={characterImageLayoutTransition}
                                        />
                                    </div>
                                    <div className="service-modal-panel" style={{ background: selectedService.panelColor }}>
                                        <button
                                            type="button"
                                            className="service-modal-close"
                                            onClick={() => setSelectedService(null)}
                                            aria-label="Close service details"
                                        >
                                            × Close
                                        </button>
                                        <div className="service-modal-content">
                                            <span className="service-modal-label">Our Service</span>
                                            <h3>{selectedService.name}</h3>
                                            <p className="service-modal-subtitle">{selectedService.subtitle}</p>
                                            <p className="service-modal-description">{selectedService.longDescription}</p>
                                            <p className="service-modal-footnote">Clips</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;
