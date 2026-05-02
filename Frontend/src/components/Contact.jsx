const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry. Elias will get back to you shortly.');
    };

    return (
        <section id="contact">
            <div className="contact-bg-shape"></div>
            <div className="contact-grid">
                <div className="contact-info-side">
                    <span className="subtitle">Connect With Us</span>
                    <h2>Let's create something <br />extraordinary together.</h2>
                    <p>
                        Whether you're planning a wedding, a commercial shoot, or a private event, 
                        we're here to capture the essence of your story.
                    </p>
                    
                    <div className="contact-details">
                        <div className="detail-item">
                            <h4>Email</h4>
                            <a href="mailto:hello@elias-photography.com">hello@elias-photography.com</a>
                        </div>
                        <div className="detail-item">
                            <h4>Phone</h4>
                            <a href="tel:+15551234567">+1 (555) 123-4567</a>
                        </div>
                        <div className="detail-item">
                            <h4>Studio</h4>
                            <p>123 Arts District<br />New York, NY 10013</p>
                        </div>
                        <div className="detail-item">
                            <h4>Follow</h4>
                            <p>@elias_frames</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-side">
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
                        <div style={{ marginTop: '3rem' }}>
                            <button type="submit" className="btn" style={{ width: '100%' }}>Send Inquiry</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
