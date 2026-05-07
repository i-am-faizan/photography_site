import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedGallery from "./components/FeaturedGallery";
import Story from "./components/Story";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Speciality from "./components/Speciality";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParallaxDivider from "./components/ParallaxDivider";
import { useHomepageContent } from "./hooks/useHomepageContent";

function App() {
  const { content, loading, usingFallback, error } = useHomepageContent();

  if (loading) {
    return (
      <div className="app-shell-state">
        <p>Loading website content...</p>
      </div>
    );
  }

  const {
    siteSettings,
    hero,
    featuredGallery,
    story,
    portfolioSection,
    portfolioItems,
    servicesSection,
    serviceItems,
    speciality,
    parallaxBlocks,
    contact,
    footer
  } = content;

  return (
    <div className="app">
      {usingFallback && (
        <div className="content-banner">
          <span>Using fallback content because the backend is unavailable.</span>
          {error && <span>{error}</span>}
        </div>
      )}
      <Header siteSettings={siteSettings} />
      <main>
        <Hero hero={hero} />
        {parallaxBlocks[0] && <ParallaxDivider {...parallaxBlocks[0]} />}
        <FeaturedGallery featuredGallery={featuredGallery} />
        {parallaxBlocks[1] && <ParallaxDivider {...parallaxBlocks[1]} />}
        <Story story={story} />
        {parallaxBlocks[2] && <ParallaxDivider {...parallaxBlocks[2]} />}
        <Portfolio portfolioSection={portfolioSection} portfolioItems={portfolioItems} />
        {parallaxBlocks[3] && <ParallaxDivider {...parallaxBlocks[3]} />}
        <Services servicesSection={servicesSection} serviceItems={serviceItems} />
        <Speciality speciality={speciality} />
        {parallaxBlocks[4] && <ParallaxDivider {...parallaxBlocks[4]} />}
        <Contact contact={contact} />
      </main>
      <Footer footer={footer} socialLinks={siteSettings?.socialLinks || []} />
    </div>
  );
}

export default App;
