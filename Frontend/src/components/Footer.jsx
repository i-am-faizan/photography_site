const Footer = ({ footer, socialLinks = [] }) => {
  return (
    <footer>
      <div className="footer-logo">{footer?.logoText}</div>
      <div className="social-links">
        {socialLinks.map((link) => (
          <a key={`${link.href}-${link.label}`} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--text-muted)" }}>{footer?.copyrightText}</p>
    </footer>
  );
};

export default Footer;
