const Services = () => {
    return (
        <section id="services">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>Our Services</h2>
                <p style={{ color: 'var(--text-muted)' }}>Tailored experiences for your most precious moments.</p>
            </div>
            <div className="services-grid">
                <div className="service-card">
                    <h3>Wedding Stories</h3>
                    <p>Capturing the raw emotion and intricate details of your special day with an editorial eye.</p>
                </div>
                <div className="service-card">
                    <h3>Portraiture</h3>
                    <p>Deeply personal and artistic portraits that reveal the true character of the subject.</p>
                </div>
                <div className="service-card">
                    <h3>Commercial</h3>
                    <p>High-end visual content for brands that value aesthetic excellence and narrative power.</p>
                </div>
            </div>
        </section>
    );
};

export default Services;
