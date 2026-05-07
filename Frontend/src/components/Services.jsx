import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getImageUrl } from "../lib/contentUtils";

const characterImageLayoutTransition = {
  type: "tween",
  ease: "linear",
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
        <div className="character-image-container">
          <motion.img
            src={getImageUrl(service.image)}
            alt={service.name}
            className="character-image"
            layoutId={`service-image-${service._id || service.name}`}
            transition={characterImageLayoutTransition}
          />
        </div>

        <div className="character-card-bg" style={{ background: service.color }}>
          <div className="character-info">
            <h3>{service.name}</h3>
            <p>
              <strong>{service.desc}</strong>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = ({ servicesSection, serviceItems = [] }) => {
  const [selectedService, setSelectedService] = useState(null);
  const services = [...serviceItems]
    .filter((item) => item.published !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  useEffect(() => {
    if (!selectedService) {
      document.body.style.overflow = "";
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedService(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedService]);

  return (
    <section id="services" className="characters-section">
      <div className="section-header">
        <span className="subtitle">{servicesSection?.subtitle}</span>
        <h2 className="title">{servicesSection?.title}</h2>
        <div className="header-line"></div>
      </div>
      <div className="characters-grid">
        {services.map((service, index) => (
          <ServiceCard key={service._id || service.name} service={service} index={index} onSelect={setSelectedService} />
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
                      src={getImageUrl(selectedService.image)}
                      alt={selectedService.name}
                      className="service-modal-image"
                      layoutId={`service-image-${selectedService._id || selectedService.name}`}
                      transition={characterImageLayoutTransition}
                    />
                  </div>
                  <div className="service-modal-panel" style={{ background: selectedService.panelColor }}>
                    <button type="button" className="service-modal-close" onClick={() => setSelectedService(null)} aria-label="Close service details">
                      ×
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
