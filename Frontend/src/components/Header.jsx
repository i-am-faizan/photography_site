import { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <header id="header" className={scrolled ? 'scrolled' : ''}>
            <nav>
                <a href="#" className="logo">STITCH</a>
                <div className="nav-links">
                    <a href="#hero">Home</a>
                    <a href="#story">Story</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
