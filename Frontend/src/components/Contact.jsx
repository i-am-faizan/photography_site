const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry. Elias will get back to you shortly.');
    };

    return (
        <section id="contact">
            <div className="contact-container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>Let's Connect</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Inquire about availability for your upcoming project.</p>
                </div>
                <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Contact Number (Optional)</label>
                        <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="4" required placeholder="Tell us about your vision..."></textarea>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button type="submit" className="btn">Send Inquiry</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
