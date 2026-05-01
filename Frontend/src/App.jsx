import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedGallery from './components/FeaturedGallery';
import Story from './components/Story';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Speciality from './components/Speciality';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParallaxDivider from './components/ParallaxDivider';
import { transitionImages } from './data/portfolioData';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <ParallaxDivider 
          image={transitionImages[0].img}
          subtitle={transitionImages[0].subtitle}
          title={transitionImages[0].title}
          variant="1"
        />
        <FeaturedGallery />
        <ParallaxDivider 
          image={transitionImages[1].img}
          subtitle={transitionImages[1].subtitle}
          title={transitionImages[1].title}
          variant="2"
        />
        <Story />
        <ParallaxDivider 
          image={transitionImages[2].img}
          subtitle={transitionImages[2].subtitle}
          title={transitionImages[2].title}
          variant="3"
        />
        <Portfolio />
        <ParallaxDivider 
          image={transitionImages[3].img}
          subtitle={transitionImages[3].subtitle}
          title={transitionImages[3].title}
          variant="4"
        />
        <Services />
        <Speciality />
        <ParallaxDivider 
          image={transitionImages[4].img}
          subtitle={transitionImages[4].subtitle}
          title={transitionImages[4].title}
          variant="5"
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
