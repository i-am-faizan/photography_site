import { splitLines } from "../lib/contentUtils";

const Contact = ({ contact }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(contact?.successMessage || "Thank you for your inquiry.");
  };

  return (
    <section id="contact">
      <div className="contact-bg-shape"></div>
      <div className="contact-grid">
        <div className="contact-info-side">
          <span className="subtitle">{contact?.subtitle}</span>
          <h2>
            {splitLines(contact?.title).map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p>{contact?.body}</p>

          <div className="contact-details">
            {(contact?.details || []).map((detail) => (
              <div key={`${detail.label}-${detail.value}`} className="detail-item">
                <h4>{detail.label}</h4>
                {detail.href ? (
                  <a href={detail.href}>{detail.value}</a>
                ) : (
                  <p>
                    {splitLines(detail.value).map((line, index) => (
                      <span key={`${line}-${index}`}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
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
            <div style={{ marginTop: "3rem" }}>
              <button type="submit" className="btn" style={{ width: "100%" }}>
                {contact?.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
