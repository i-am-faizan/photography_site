import { motion } from "framer-motion";
import { getImageUrl, splitLines } from "../lib/contentUtils";

const renderTitleWithBreaks = (title = "") =>
  splitLines(title).map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      <br />
    </span>
  ));

const FeaturedGallery = ({ featuredGallery }) => {
  const cards = featuredGallery?.cards || {};

  return (
    <section className="featured-gallery bento-section">
      <motion.div
        className="bento-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-serif bento-title">{featuredGallery?.title}</h2>
      </motion.div>

      <div className="bento-grid-container">
        <motion.div className="bento-col col-1" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="bento-item image-card tall">
            <img src={getImageUrl(cards.lead?.image)} alt={cards.lead?.image?.alt || "Lead card"} />
            <div className="bento-overlay">
              <h3>{renderTitleWithBreaks(cards.lead?.title)}</h3>
            </div>
          </div>
          <div className="bento-item color-card bg-ref-green" style={{ backgroundImage: `url(${getImageUrl(cards.stat?.image)})` }}>
            <div className="color-card-overlay">
              <h3 className="stat-large">{cards.stat?.stat}</h3>
              <p>{cards.stat?.text}</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="bento-col col-2" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="bento-item image-card full">
            <img src={getImageUrl(cards.wide?.image)} alt={cards.wide?.image?.alt || "Wide card"} />
            <div className="bento-overlay">
              <h3>{cards.wide?.title}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div className="bento-col col-3" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <div className="bento-item image-card full">
            <img src={getImageUrl(cards.cta?.image)} alt={cards.cta?.image?.alt || "CTA card"} />
            <div className="color-card-overlay centered">
              <a href={featuredGallery?.ctaHref} className="btn mt-4">
                {featuredGallery?.ctaLabel}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div className="bento-col col-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="bento-item image-card tall">
            <img src={getImageUrl(cards.tall?.image)} alt={cards.tall?.image?.alt || "Tall card"} />
            <div className="bento-overlay">
              <h3>{renderTitleWithBreaks(cards.tall?.title)}</h3>
            </div>
          </div>
          <div className="bento-item image-card short">
            <img src={getImageUrl(cards.short?.image)} alt={cards.short?.image?.alt || "Short card"} />
            <div className="bento-overlay">
              <h3>{renderTitleWithBreaks(cards.short?.title)}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div className="bento-col col-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <div className="bento-item color-card bg-ref-darkgreen full relative-content" style={{ backgroundImage: `url(${getImageUrl(cards.family?.image)})` }}>
            <div className="color-card-overlay">
              <h3 className="spaced-text">
                <span className="large-serif gold-text">{cards.family?.accentTitle}</span>
                <span className="sub-text">{cards.family?.lineOne}</span>
                <br />
                <span className="sub-text">{cards.family?.lineTwo}</span>
                <br />
                <span className="sub-text">{cards.family?.lineThree}</span>
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
