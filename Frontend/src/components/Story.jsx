const Story = () => {
    return (
        <section id="story">
            <div className="story-grid">
                <div className="story-image">
                    <img src="/assets/photographer_portrait_1777618104247.png" alt="Elias Thorne" />
                </div>
                <div className="story-content">
                    <p style={{ letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--primary-color)', fontSize: '0.75rem', marginBottom: '1rem' }}>The Artist</p>
                    <h2>The Story Behind the Lens</h2>
                    <p>With over a decade of experience in visual storytelling, Elias focuses on the quiet moments that often go unnoticed. His work is a reflection of his belief that photography should not just document, but evoke a visceral emotional response.</p>
                    <p>Based in London, available worldwide for those who seek an editorial approach to their most cherished memories. Every click is a chapter in a larger story, meticulously crafted to stand the test of time.</p>
                </div>
            </div>
        </section>
    );
};

export default Story;
