import { useState, useEffect } from "react";

const Header = ({ siteSettings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [...(siteSettings?.navLinks || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header id="header" className={`${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
      <nav>
        <a href="#" className="logo" onClick={closeMenu}>
          {siteSettings?.brandName || "STITCH"}
        </a>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <a key={`${link.href}-${link.label}`} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>

        <button className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
