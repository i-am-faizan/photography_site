import { useState } from 'react';
import { portfolioItems, extraItems } from '../data/portfolioData';

const Portfolio = () => {
    const [filter, setFilter] = useState('all');
    const [items, setItems] = useState(portfolioItems);
    const [hasLoadedMore, setHasLoadedMore] = useState(false);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleLoadMore = () => {
        setItems([...items, ...extraItems]);
        setHasLoadedMore(true);
    };

    const filteredItems = filter === 'all' 
        ? items 
        : items.filter(item => item.category === filter);

    return (
        <section id="portfolio">
            <div className="portfolio-header">
                <div>
                    <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>Selected Works</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>A curated collection of human connection and light across the globe.</p>
                </div>
                <div className="filters">
                    <button 
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
                        onClick={() => handleFilterChange('all')}
                    >All</button>
                    <button 
                        className={`filter-btn ${filter === 'wedding' ? 'active' : ''}`} 
                        onClick={() => handleFilterChange('wedding')}
                    >Wedding</button>
                    <button 
                        className={`filter-btn ${filter === 'party' ? 'active' : ''}`} 
                        onClick={() => handleFilterChange('party')}
                    >Party</button>
                    <button 
                        className={`filter-btn ${filter === 'birthday' ? 'active' : ''}`} 
                        onClick={() => handleFilterChange('birthday')}
                    >Birthday</button>
                </div>
            </div>

            <div className="portfolio-grid" id="portfolio-grid">
                {filteredItems.map(item => (
                    <div key={item.id} className="portfolio-item show" data-category={item.category}>
                        <img src={item.img} alt={item.title} />
                        <div className="portfolio-overlay">
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            {!hasLoadedMore && (
                <div className="load-more-container">
                    <button className="btn" onClick={handleLoadMore}>Load More</button>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
