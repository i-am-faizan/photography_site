import { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header id="header" className={`${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <nav>
                <a href="#" className="logo" onClick={closeMenu}>STITCH</a>
                
                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <a href="#hero" onClick={closeMenu}>Home</a>
                    <a href="#story" onClick={closeMenu}>Story</a>
                    <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
                    <a href="#services" onClick={closeMenu}>Services</a>
                    <a href="#contact" onClick={closeMenu}>Contact</a>
                </div>

                <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
