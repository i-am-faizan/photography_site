import React from 'react';

const ParallaxDivider = ({ image, title, subtitle }) => {
    return (
        <section className="parallax-divider">
            <div 
                className="bg-image" 
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="content">
                <p>{subtitle}</p>
                <h2>{title}</h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--primary-color)', margin: '2rem auto 0' }}></div>
            </div>
        </section>
    );
};

export default ParallaxDivider;
