import { useEffect, useState } from "react";
import { getImageUrl } from "../lib/contentUtils";

const Portfolio = ({ portfolioSection, portfolioItems = [] }) => {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(portfolioSection?.initialVisibleCount || 8);

  useEffect(() => {
    setVisibleCount(portfolioSection?.initialVisibleCount || 8);
  }, [portfolioSection?.initialVisibleCount]);

  const sortedItems = [...portfolioItems]
    .filter((item) => item.published !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const filteredItems = filter === "all" ? sortedItems : sortedItems.filter((item) => item.category === filter);
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMoreItems = visibleItems.length < filteredItems.length;
  const filters = [...(portfolioSection?.filters || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="portfolio">
      <div className="portfolio-header">
        <div>
          <h2 className="section-title">{portfolioSection?.title}</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "400px" }}>{portfolioSection?.intro}</p>
        </div>
        <div className="filters">
          {filters.map((item) => (
            <button
              key={item.value}
              className={`filter-btn ${filter === item.value ? "active" : ""}`}
              onClick={() => {
                setFilter(item.value);
                setVisibleCount(portfolioSection?.initialVisibleCount || 8);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-grid" id="portfolio-grid">
        {visibleItems.map((item) => (
          <div key={item._id || item.id} className="portfolio-item show" data-category={item.category}>
            <img src={getImageUrl(item.image)} alt={item.image?.alt || item.title} />
            <div className="portfolio-overlay">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMoreItems && (
        <div className="load-more-container">
          <button className="btn" onClick={() => setVisibleCount((prev) => prev + (portfolioSection?.loadMoreStep || 8))}>
            {portfolioSection?.loadMoreLabel}
          </button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
