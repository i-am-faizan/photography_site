const Speciality = () => {
    return (
        <section id="speciality" className="speciality">
            <div className="spec-grid">
                <div>
                    <h2 className="section-title">Our Speciality</h2>
                    <p style={{ marginBottom: '3rem' }}>We specialize in "Quiet Luxury" photography—where every image feels effortless yet deeply intentional. Our technical mastery combined with an artistic soul allows us to capture what others miss.</p>
                    <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--primary-color)' }}>✦</span> Low Light Mastery & Atmospheric Shots
                        </li>
                        <li style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--primary-color)' }}>✦</span> Cinematic Drone Cinematography
                        </li>
                        <li style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--primary-color)' }}>✦</span> 35mm Analog Film Photography
                        </li>
                    </ul>
                </div>
                <div style={{ background: 'var(--surface-color)', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--accent-color)' }}>
                    <img src="/assets/portfolio_commercial_1777618337873.png" alt="Speciality" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>
        </section>
    );
};

export default Speciality;
